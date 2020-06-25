const studentArray = ['Harry','Larry','Barry'];

for (let i=0; i < 3; i++) {
    const name = prompt('Enter a student name!');
    studentArray.push(name);
}

for (let i=0; i < studentArray.length; i++) {
    console.log(studentArray[i]);
}