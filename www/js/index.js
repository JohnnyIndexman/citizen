
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    getPosts();
    setupEventListeners();
    requestCameraPermission();

    var firebaseConfig = {
        apiKey: "AIzaSyB760eFIJKwsdMaCsEXy1R7jmxOmYmQ_Zc",
        authDomain: "nnamdi-app-6171c.firebaseapp.com",
        projectId: "nnamdi-app-6171c",
        storageBucket: "nnamdi-app-6171c.appspot.com",
        messagingSenderId: "642785865553",
        appId: "1:642785865553:android:d39bdde0b8703d477d6d70"
    }

    firebase.initializeApp(firebaseConfig);
    signIn()

    document.querySelector('.login-btn').addEventListener('click', login);
    document.querySelector('.sign-up').addEventListener('click', signIn);

    
// Request permission to receive push notifications
FCMPlugin.requestPushPermission(function(success){
    console.log("Push permission granted: " + success);
}, function(err){
    console.log("Push permission denied: " + err);
});

// Get the device token
FCMPlugin.getToken(function(token) {
    console.log("FCM Token: " + token);
    // Send the token to your server or save it locally
}, function(err) {
    console.log("Error retrieving token: " + err);
});

// Listen for incoming notifications
FCMPlugin.onNotification(function(data) {
    console.log("Notification received: " + JSON.stringify(data));
    
    if (data.wasTapped) {
        // Notification was received in background and tapped by the user
        alert("Background: " + JSON.stringify(data));
    } else {
        // Notification was received in foreground
        alert("Foreground: " + JSON.stringify(data));
    }
}, function(msg) {
    console.log("onNotification callback successfully registered: " + msg);
}, function(err) {
    console.log("Error registering onNotification callback: " + err);
});
}

if (!window.cordova) {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('Running in browser');
        getPosts();
        setupEventListeners();
        // btnLoad()
    }, false);
}

function setupEventListeners() {
    const first = document.getElementById('front');
    const report = document.querySelector('.report');
    const view = document.querySelector('.view');
    const button = document.querySelector('#report-btn');
    const cameraBtn = document.querySelector('.repo-btn');
    const form = document.querySelector('#form')
    // const locationBtn = document.querySelector('#location');

    view.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('#display');
    });

    report.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('#report');
    });

    // button.addEventListener('click', handleClick);
    cameraBtn.addEventListener('click', btnLoad);
    form.addEventListener('submit', handleClick)
    // locationBtn.addEventListener('click', getLocation);
    document.querySelector('.anchor').addEventListener('click', (e) =>{
        e.preventDefault();
        showSection('#login');
    })

    const returnLink = document.querySelector('.return');
    returnLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('#front');
    });

    const _returnLink = document.querySelector('.ret')
    _returnLink.addEventListener('click', (e) =>{
        e.preventDefault();
        showSection('#front');
    })
}

function showSection(sectionId) {
    const sections = ['#front', '#report', '#display', '#login', '#sign-up'];
    sections.forEach(id => {
        const section = document.querySelector(id);
        if (section) {
            section.style.display = id === sectionId ? 'block' : 'none';
        } else {
            console.error(`Section ${id} not found.`);
        }
    });
    window.location.hash = sectionId;
}

function create() {
    const _nameInput = document.querySelector('.name-input');
    const _dateInput = document.querySelector('.date-input');
    const textArea = document.querySelector('#text');
    const _title = document.querySelector('.headin');
    const _image = document.querySelector('.img');
    const _sectionThird = document.querySelector('#display');

    let newDiv = document.createElement('div');
    let newP = document.createElement('p');
    let newh4 = document.createElement('h4');
    let newSmall = document.createElement('small');
    let newImage = document.createElement('img');
    let newTitle = document.createElement('h3');
    let newDel = document.createElement('button');

    newDiv.classList.add('display-contain');
    newP.classList.add('report-disp');
    newh4.classList.add('author');
    newSmall.classList.add('dates');
    newDel.classList.add('btn');
    newTitle.classList.add('title');
    newImage.classList.add('image');

    _sectionThird.append(newDiv);
    newDiv.append(newSmall);
    newDiv.append(newImage);
    newDiv.append(newTitle);
    newDiv.append(newP);
    newDiv.append(newh4);
    newDiv.append(newDel);

    let n = _nameInput.value;
    let t = textArea.value;
    let d = _dateInput.value;
    let i = _image.src;
    let h = _title.value;
    newDel.textContent = 'DELETE';

    let postId = Date.now().toString();
    newDiv.setAttribute('data-id', postId);
    newDel.addEventListener('click', () => handleDelete(postId));

    newSmall.textContent = d;
    newP.textContent = t;
    newh4.textContent = n;
    newTitle.textContent = h;
    newImage.src = i;

    return {
        id: postId,
        author: n,
        content: t,
        date: d,
        image: i,
        title: h
    };
}

function validation() {
    const _nameInput = document.querySelector('.name-input');
    const textArea = document.querySelector('#text');
    const _dateInput = document.querySelector('.date-input');
    const _title = document.querySelector('.headin');
    const small = document.querySelectorAll('.error');

    let n = _nameInput.value;
    let t = textArea.value;
    let d = _dateInput.value;
    let h = _title.value;
    let isValid = true;

    if (n === '') {
        small[0].innerHTML = 'Empty space... fill.';
        small[0].style.color = 'red';
        isValid = false;
    }
    if (t === '') {
        small[3].innerHTML = 'Empty space... drop a report.';
        small[3].style.color = 'red';
        isValid = false;
    }
    if (d === '' || !d.includes('/') || d.length > 8) {
        small[2].innerHTML = 'Empty space... add a date.';
        small[2].style.color = 'red';
        isValid = false;
    }

    if (h === '') {
        small[1].innerHTML = 'Empty space... add a title.';
        small[1].style.color = 'red';
        isValid = false;
    }

    return isValid;
}

function clearForm() {
    const _nameInput = document.querySelector('.name-input');
    const textArea = document.querySelector('#text');
    const _dateInput = document.querySelector('.date-input');
    const small = document.querySelectorAll('.error');

    _nameInput.value = '';
    textArea.value = '';
    _dateInput.value = '';
    small.forEach(error => error.innerHTML = '');
}

function handleClick(e) {
    e.preventDefault();
    if (validation()) {
        const newData = create();
        clearForm();
        showSection('#display');
        // _secondSection.style.display = 'none';

        updateDataInAPI(newData);
    }
}

const apiUrl = 'https://api.jsonbin.io/v3/b/66561594acd3cb34a84f1aa4';
const apiKey = '$2a$10$30mTRR3MEU5aEg7vrH4gm.CJ71cUus/tDIpROQHIpKIxMsOdqHrGK';

function updateDataInAPI(newData) {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            const currentData = data.record;
            currentData.reports.push(newData);

            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(currentData)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedData => {
            console.log('Data successfully updated:', updatedData);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
}

function getPosts() {
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Response was not okay');
            }
            return res.json();
        })
        .then(data => {
            displayPosts(data);
            console.log(data);
        })
        .catch(err => {
            console.log("Error fetching posts:", err.message);
        });
}

function displayPosts(data) {
    let info = data.record.reports;
    console.log('info:', info);
    let container = document.querySelector('.contain-display');
    let output = `<h1 class='heading'>Reports</h1>`;
    info.forEach(i => {
        output += `
        <div class='posts'>
          <div class='display-contain' key=${i.id}>
            <span class='dates'>${i.date}</span>
            <img src=${i.image} class='image'/>
            <h3 class='title'>${i.title}</h3>
            <p class='report-disp'>${i.content}</p>
            <h4 class='author'>${i.author}</h4>
            <button class='btn' onClick='handleDelete("${i.id}")'>DELETE</button>
          </div>
        </div>
        `;
    });
    container.innerHTML = output;
}

window.handleDelete = function (id) {
    console.log(`Attempting to delete post with ID: ${id}`);

    // Fetch the current data
    fetch(apiUrl, {
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const updatedReports = data.record.reports.filter(report => report.id !== id);

        if (updatedReports.length === data.record.reports.length) {
            throw new Error(`Post with ID ${id} not found`);
        }

        return fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey
            },
            body: JSON.stringify({ reports: updatedReports })
        });
    })
    .then(response => {
        console.log('Response from DELETE request:', response);
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Network response was not ok: ${text}`);
            });
        }
        return response.json();
    })
    .then(() => {
        console.log(`Post with ID ${id} deleted successfully`);
        getPosts();
    })
    .catch(error => {
        console.error('Error deleting post:', error.message);
    });
};

function requestCameraPermission() {
    if (cordova.platformId === 'android') {
        let permissions = cordova.plugins.permissions;
        permissions.requestPermission(permissions.CAMERA, function(status) {
            if (!status.hasPermission) {
                console.error("Camera permission denied");
            }
        }, function() {
            console.error("Failed to request camera permission");
        });
    }
}

function btnLoad() {
    if (window.cordova && navigator.camera) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            saveToPhotoAlbum: true,
            encodingType: Camera.EncodingType.JPEG,
            destinationType: Camera.DestinationType.DATA_URL,
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.CAMERA,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetHeight: 300,
            targetWidth: 200
        });
    } else {
        alert('Camera not available in browser.');
    }
}

function onSuccess(imageData) {
    console.log('Image captured successfully:', imageData);
    let image = document.querySelector('.img');
    let source = document.querySelector('.image-src');
    image.src = "data:image/jpeg;base64," + imageData;
    source.textContent = imageData;
}

function onFail(message) {
    console.error('Failed because:', message);
    alert('Failed because: ' + message);
    document.querySelector('.image-src').textContent = message;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
    } else {
        alert('Geolocation not available in browser.');
    }
}

function onWeatherSuccess(position) {
    const locationElement = document.querySelector('.location');
    const Latitude = position.coords.latitude;
    const Longitude = position.coords.longitude;
    locationElement.textContent = `Your coords are Latitude: ${Latitude}, Longitude: ${Longitude}`;
}

function onWeatherError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


//firbase authentication code

var firebaseConfig = {
    apiKey: "AIzaSyB760eFIJKwsdMaCsEXy1R7jmxOmYmQ_Zc",
    authDomain: "nnamdi-app-6171c.firebaseapp.com",
    projectId: "nnamdi-app-6171c",
    storageBucket: "nnamdi-app-6171c.appspot.com",
    messagingSenderId: "642785865553",
    appId: "1:642785865553:android:d39bdde0b8703d477d6d70"
}
firebase.initializeApp(firebaseConfig);
document.querySelector('.sign-up').addEventListener('click', signIn);
document.querySelector('.login-btn').addEventListener('click', login);

// Function to handle sign-in
function login() {
    const emailElement = document.getElementById('login-email');
    const passwordElement = document.getElementById('login-password');
    const loginSection = document.getElementById('login');
    const signUpSection = document.getElementById('sign-up')
    const front = document.getElementById('front');
    const errorElement = document.querySelector('.err');
    
    if (!emailElement || !passwordElement || !loginSection || !signUpSection || !errorElement) {
        console.error('Required element not found.');
        return;
    }
    
    const email = emailElement.value;
    const password = passwordElement.value;

    if (!email || !password) {
        errorElement.textContent = 'Please fill in both email and password.';
        errorElement.style.color = 'red';
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert('User signed in: ' + user.email);
            window.location.href = '#front';
            front.style.display = 'block';
            loginSection.style.display = 'none'
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Invalid email address...');
            console.log(errorMessage)
        });
}

// document.querySelector('.anchor').addEventListener('click', (e) =>{
//     e.preventDefault();
//     const login = document.querySelector('#login')
//     const signIn = document.querySelector('#sign-up')
    
//     login.style.display = 'block'
//     signIn.style.display = 'none'
// })

// Function to handle sign-up

// function signIn() {
//     const email = document.querySelector('#sign-email').value
//     const password = document.querySelector('#sign-password').value;
//     const login = document.querySelector('#login')
//     const signUp = document.querySelector('#sign-up')
//     const error = document.querySelector('.err')

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             var user = userCredential.user;
//             alert('User signed up: ' + user.email);
//             window.location.href = '#login';
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // alert('Error: ' + errorMessage);
//             error.textContent = errorMessage;
//             error.style.color = 'red'
//         });
        
//         login.style.display = 'block'
//         signUp.style.display = 'none'
// }


function signIn() {
    const emailElement = document.getElementById('sign-email');
    const passwordElement = document.getElementById('sign-password');
    const loginSection = document.getElementById('login');
    const signUpSection = document.getElementById('sign-up');
    const errorElement = document.querySelector('.err');
    
    if (!emailElement || !passwordElement || !loginSection || !signUpSection || !errorElement) {
        console.error('Required element not found.');
        return;
    }
    
    const email = emailElement.value;
    const password = passwordElement.value;

    if (!email || !password) {
        errorElement.textContent = 'Please fill in both email and password.';
        errorElement.style.color = 'red';
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            // Redirect to the login section
            signUpSection.style.display = 'none';
            loginSection.style.display = 'block';
            window.location.href = '#login';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // Display error message in the error element
            errorElement.textContent = errorMessage;
            errorElement.style.color = 'red';
        });
}

