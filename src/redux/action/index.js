//For ADD item into cart
export const addCart=(product)=>{
    return{
        type:"ADDITEM",
        payload:product
    }
}
//For DELETEitem into cart
export const delCart=(product)=>{
    return{
        type:"DELITEM",
        payload:product
    }
}