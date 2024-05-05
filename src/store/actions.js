export const fetchData = (limit,offset)=>async(dispatch)=>{
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");

        const body = JSON.stringify({limit,offset});

        const requestOptions = {
            method:"POST",
            headers: myHeaders,
            body
        }

        const response = await fetch(
            "https://api.weekday.technology/adhoc/getSampleJdJSON",
            requestOptions
        );

        const data = await response.json();
        dispatch({
            type:"FETCH_SUCCESS",
            payload:data.jdList,
            offset
        })
    }catch(err){
        dispatch({
            type:"FETCH_FAILURE",
            error:err.message
        });
    }
}