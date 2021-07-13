async function getName(){
    let data = await fromServer();
    console.log(data.userName)
    let text = "Watch you watchin " + data.userName + "?"
    $('#userName').append(text)
  }
  function fromServer(){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/get-name",
        success: function(data) {
          resolve(data)
       },
        error: function(data) {
        console.log("Error")  
        },
        dataType: "json"
      });
    })
  }
  getName()