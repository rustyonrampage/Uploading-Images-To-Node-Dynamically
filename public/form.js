document.getElementById('form').onsubmit = function(event){
    event.preventDefault() // prevent form from posting without JS
    var xhttp = new XMLHttpRequest(); // create new AJAX request

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("status").innerHTML = 'sent'+this.responseText+ xhttp.status;
      }else{
        document.getElementById("status").innerHTML = xhttp.status ;
      }
    }

    xhttp.open("POST", "upload")
    var formData = new FormData()
    // the text data
    formData.append('name', document.getElementById('name').value)
    // since inputs allow multi files submission, therefore files are in array
    formData.append('avatar', document.getElementById('avatar').files[0]) 


    console.log(document.getElementById('avatar'))
    console.log(document.getElementById('avatar').files)

    // xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // var data = "name=asdasdasdas&degree=MS";
    xhttp.send(formData)

}