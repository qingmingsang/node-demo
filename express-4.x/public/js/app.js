console.log('js file');

fetch('/hello').then((response) => {
  return response.text();
}).then((data) => {
  console.log(data);
}).catch((e) => {
  console.log("Oops, error");
});

fetch('/', { method: 'POST' }).then((response) => {
  return response.text();
}).then((data) => {
  console.log(data);
}).catch((e) => {
  console.log("Oops, error");
});

fetch('/user', { method: 'PUT' }).then((response) => {
  return response.text();
}).then((data) => {
  console.log(data);
}).catch((e) => {
  console.log("Oops, error");
});

fetch('/user', { method: 'DELETE' }).then((response) => {
  return response.text();
}).then((data) => {
  console.log(data);
}).catch((e) => {
  console.log("Oops, error");
});