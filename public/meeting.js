//let baseurl = "https://selfsiksha.igaptechnologies.com/";
let baseurl = "http://192.168.1.8:8081/selfsiksha.in/";

function getparameter(name)
{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const parameter = urlParams.get(name);      
  return parameter;
}

function startlecture(){
  let dynamiclink = getparameter('link');
  let teacherid = getparameter('teacherid');
  let userid = getparameter('userid');
  document.getElementById("roomName").value = dynamiclink;
  if(teacherid != null){
      $.ajax({
          url :  baseurl + "api/startlecture",
          method : "POST",
          data : {dynamiclink: dynamiclink, teacherid: teacherid},
          async : true,
          dataType : 'json',
          success: function(data){
              if(data.status == "running"){
                  meetingrunning = true;
                  amihost = true;
                  let roomName = roomInput.value;
                  socket.emit("join", roomName);
                  lectureid = data.id;
                  let meetingname = data.title;
                  divmeetingname.innerText = meetingname;
              }
              else{
                  alert("Sorry, meeting is not running.");
              }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) { 
              alert(errorThrown); 
          }   
      });
  }
  else{
    $.ajax({
        url :  baseurl + "api/markmyentry",
        method : "POST",
        data : {dynamiclink: dynamiclink, userid: userid},
        async : true,
        dataType : 'json',
        success: function(data){
            if(data.status == "success"){
                meetingrunning = true;
                amihost = false;
                let roomName = roomInput.value;
                socket.emit("join", roomName);
                lectureid = data.id;
                let meetingname = data.title;
                divmeetingname.innerText = meetingname;
            }
            else{
                alert("Sorry, meeting is not running.");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(errorThrown); 
        }   
    });
  }
}