let weather=document.querySelector(".weather");

let my_location=document.querySelector(".my_location");
let curr_time=document.querySelector(".time");
let cloud_div=document.querySelector(".today");
let cloud_icon=document.querySelector(".myclass");

let main_deg=document.querySelector(".main_degree");
let min_deg=document.querySelector(".min_degree");
let max_deg=document.querySelector(".max_degree");
let humidity_deg=document.getElementById("h_deg");
let presure_deg=document.getElementById("pre_deg");
let wind_deg=document.getElementById("wind_deg");
let feel_deg=document.getElementById("feels_deg");
let form_submit=document.querySelector(".wether_header");
let city="London";



//find the current location
const add_location=(city)=>{
     return new Intl.DisplayNames([city],{type:"region"}).of(city);
}
//find the curr date and time

const add_curr_time= (insec)=>{
    let mili_sec=insec*1000;
    const option={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minut:"numeric",
      //  sec:"numeric",
    };
    return new Intl.DateTimeFormat("en-US",option).format(mili_sec);
}



const addfun= async ()  =>{

    //search
    form_submit.addEventListener("submit",(e)=>{
        e.preventDefault();
        let search=document.querySelector(".search");
       
        city=search.value;
        search.value="";
        addfun();

    });
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=00c243d5bdb17acb8ad8d72355baceb9`;
    try {
        
      
        //use api
        let promice= await fetch(url); //this is json data; stored  in our memory int json format
       //

       let data= await promice.json()//convert json format to object
        
       const {main,name,weather,dt,wind,sys}=data;
       
       //add curr location
        
        my_location.innerHTML=`${name},${add_location(sys.country)}`;

        //2 add time 
        curr_time.innerHTML=add_curr_time(dt);

        //add feel
        cloud_div.innerHTML=weather[0].main
        //cloud icon
      //
      main_deg.innerHTML=`${main.temp}&deg`;
      max_deg.innerHTML=`max:${main.temp_max}$deg`;
      min_deg.innerHTML=`min${main.temp_min}&deg`;

      //inner div 
      humidity_deg.innerHTML=`${main.humidity}&deg`;
      presure_deg.innerHTML=`${main.pressure}&deg`;
      wind_deg.innerHTML=`${wind.deg}&deg`;
      feel_deg.innerHTML=`${main.feels_like}&deg`;
        
    } catch (err) {
        console.log(err);
    }
}

document.body.addEventListener("load",addfun())
    
