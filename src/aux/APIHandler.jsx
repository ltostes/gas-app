
const keyMaker = ({code,name}) => `gasapp-${code}-${name}`

export const GET_ENDPOINT = '/api/registries/get';
export const SET_ENDPOINT = '/api/registries/set';

export async function APIdataFetch({name, code}) {
    if (!name || !code) {return;};

    const key = keyMaker({code,name});

    const params = new URLSearchParams({key});
    
    const response = await fetch(`${GET_ENDPOINT}?${params}`);
    const json = await response.json();

    return json;
}

export async function APIdataSet({data, name, code}) {
    if (name == '' || code == '') {return;};
    
    const params = new URLSearchParams({key: keyMaker({code,name})});
    
    const body = JSON.stringify(data);
    
    console.log("API DATA SET")
    console.log({name, code, data, params, body})
    const response = await fetch(`${SET_ENDPOINT}?${params}`, {
      method: "POST",
      body
    });
    console.log({response})
    const json = await response.json();

    return json;
}


