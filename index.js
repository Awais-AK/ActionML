function myFunction() {
    var x = document.getElementById("frm1");
    var page = x.elements.page.value;
    var userId = x.elements.userId.value;
    console.log(userId);
    console.log(page);
    localStorage.setItem('userId',userId);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "http://localhost:3000/reportview?userId="+userId+"&page="+page, true);
    xhttp.send();

    // document.getElementById("demo").innerHTML = text;
  }

