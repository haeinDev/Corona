
function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("sideMenu").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("sideMenu").style.marginLeft= "0";
  }
    //Your entire JS code here
    console.log("ddd");

// get the Element from the view
const search_text = document.getElementById("search_text");
const search_btn = document.getElementById("search_btn");
const mask_list = document.getElementById("mask_list");
console.log(search_text);
// make it work by pressing enter 
search_text.addEventListener("keydown", function (event){

//   // // console.log("ddd");
    if (event.keyCode === 13){
        search_btn.click();

    }
});
// action for click button
search_btn.addEventListener("click", handleSearch);
// manage action for click
async function handleSearch(event){
    event.preventDefault();
    //delete the previous output
    Array.from(mask_list.children).forEach(item => item.remove());
    document.getElementById("th1").style.display = "none";
    document.getElementById("th2").style.display = "none";
    document.getElementById("th3").style.display = "none";
    // put the input value into address to search
    const address = search_text.value;
    console.log(address);
    // runt the getDatas function and save the data into datas
    const datas = await getDatas(address);
    // rendering data 
    datas.forEach(function (data) {
    mask_list.appendChild(renderItem(data));
    })
}
// making list 
function renderItem(data){
    // th row 
    document.getElementById("th1").style.display = "table-cell";
    document.getElementById("th2").style.display = "table-cell";
    document.getElementById("th3").style.display = "table-cell"; 
    
    const tr = document.createElement("tr");
    const td_remain_stat = document.createElement("td");
    const td_name = document.createElement("td");
    const td_addr = document.createElement("td");

    td_remain_stat.className = "mask-remain_stat";
    td_name.className = "mask-name";
    td_addr.className = "mask-addr";
    td_remain_stat.appendChild(document.createTextNode(data.remain_stat));
    td_name.appendChild(document.createTextNode(data.name));
    td_addr.appendChild(document.createTextNode(data.addr));
    tr.appendChild(td_remain_stat);
    tr.appendChild(td_name);
    tr.appendChild(td_addr);
    
    return tr;
}
//  request the data to https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v
function getDatas(address, filtering){
    const server_url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1";
    const api_uri = "/storesByAddr/json";
    const data = axios({
        method: "GET",
        url: server_url + api_uri,
        params:{
            "address": address
        },
        headers:{
            "Content-Type": "application/json"
        }
    }).then(function (result){
        const stores = result.data.stores;
        return stores;

    }).catch(function (error){
        console.error(error);
        return [];
        });
    return data;
}
