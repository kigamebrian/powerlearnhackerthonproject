
//function addTask () adds a click eventlistner to the addtask button
function addTask(){
	var button = document.getElementById("button");
	button.addEventListener("click",save,false);
	display();
}

/* function save() gets data from the input fields and stores
them in title and new_task variables. it also captures and stores the time
the tasks were created */
function save(){
	//capturing time
	const h = new Date().getHours();
	const m = new Date().getMinutes();
	const t = h + " : " + m;
	//sessionStorage.setItem('time',t);

	//getting values from input
	var title = document.getElementById("title").value;
	var new_task = document.getElementById("new_task").value;
	var date= document.getElementById('date').value;
	sessionStorage.setItem(title,new_task,date);
	display();
	title.value = "";
	new_task.value = "";
	date.value="";

}


// function display() displays the tasks on the browser
function display(){

	var display_task = document.getElementById("display_task");
	display_task.innerHTML="";
	for(var i = 0; i < sessionStorage.length; i++){

		var a = sessionStorage.key(i);
		var b = sessionStorage.getItem(a);
		var c = sessionStorage.getItem(b);

		display_task.innerHTML += "<div class='list' >"+ a +": ---->" + " " +b+" "+c+"  " + " <button class = 'but edit'> edit </button>" + " <button class = 'but delete'> delete </button>"+"</div>" +"<br>";
	}
}

window.addEventListener("load",addTask,false);

// Data Picker Initialization
$(function(){
   $('.datepicker').datepicker({
      format: 'mm-dd-yyyy'
    });
});
