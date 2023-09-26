let count = 0;
let myActs = [];


function handleOnLoad() {

let act = {};

  myActs.push(act);
  myActs=JSON.parse(localStorage.getItem('myActs'));
  if(!myActs){myActs = []}
  myActs.sort((d1, d2) => new Date(d2.Date) - new Date(d1.Date));
  console.log(myActs);
  let html=`
  <div class="jumbotron text-center">
    <h1>Tidefit</h1>
  </div>
  <table class="table">
    <tr>
      <th>Type</th>
      <th>Distance in Miles</th>
      <th>Date</th>
      <th>Pinned</th>
      <th>Pin/Delete</th>
    </tr>`
    if (myActs === null) {
      myActs = [];
    }
    myActs.forEach(function(act) {
      html += `
      <tr>
        <td>${act.Type}</td>
        <td>${act.Distance}</td>
        <td>${act.Date}</td>
        <td>${act.Pinned ? 'Yes' : 'No'}</td>
        <td>
          <button onclick="handleActPin(${act.Idnum})">Toggle Pin</button>
          <button onclick="handleActDelete(${act.Idnum})">Delete</button>
        </td>
      </tr>`;
  });
html += `
</table>
    
<form>
<h6>
  Add a new activity:<br>

  <label for="type">Type:</label><br>
  <input type="text" id="type" name="type"><br>

  <label for="distance">Distance in Miles:</label><br>
  <input type="number" step="0.1" id="distance" name="distance"><br>

  <label for="date">Date:</label><br>
  <input type="date" id="date" name="date"><br>

  <button onclick="handleActAdd()">Submit</button>
</form>
</h6>
`
  document.getElementById('app').innerHTML=html;
}

function handleActDelete(idToDelete) {
  let ActsDeleter = myActs.findIndex(item => item.Idnum === idToDelete);

  if (ActsDeleter !== -1) {
    myActs.splice(ActsDeleter, 1);
    localStorage.setItem('myActs', JSON.stringify(myActs));
    location.reload();
  }
}

function handleActPin(idToPin) {
  let ActsPinner = myActs.findIndex(item => item.Idnum === idToPin);

  if (ActsPinner !== -1) {
    myActs[ActsPinner].Pinned = !myActs[ActsPinner].Pinned;
    localStorage.setItem('myActs', JSON.stringify(myActs));
    location.reload();
  }
}

function handleIDAssign() {
  let count = 1

  for (let i = 0; i < myActs.length; i++) {
    count = count + 1
  }
  return count;
}

function handleActAdd() {
    if (myActs === null) {
      myActs = [];
    }
    let act = {Idnum: handleIDAssign(), Type: document.getElementById('type').value, Distance: document.getElementById('distance').value, Date: document.getElementById('date').value}
    myActs.push(act);
    localStorage.setItem('myActs', JSON.stringify(myActs));
}