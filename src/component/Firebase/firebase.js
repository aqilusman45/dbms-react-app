import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBBpyKJsZhXY2j-OGO41xqPjUo_4_wL7nI",
  authDomain: "dummy-project2.firebaseapp.com",
  databaseURL: "https://dummy-project2.firebaseio.com",
  projectId: "dummy-project2",
  storageBucket: "dummy-project2.appspot.com",
  messagingSenderId: "239950467262",
  appId: "1:239950467262:web:347fc119f41a2d14b98eef"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    this.db
      .enablePersistence()
      .then(() => {
        console.log("App works Offline");
      })
      .catch(function (err) {
        console.log("App not works offline", err);
      });
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.users(authUser.uid)
          .get()
          .then(doc => {
            if (doc.data() !== undefined) {
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                username: authUser.username,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                userrole: doc.data().userrole,
                franchise: doc.data().franchise || ''
              };
            }
            next(authUser);
          });
      } else {
        if (authUser) {
          fallback(authUser);
        } else {
          fallback();
        }
      }
    });

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  forgotPassword = email => this.auth.sendPasswordResetEmail(email);

  users = uid => this.db.doc(`users/${uid}`);

  passwordUpdate = password => this.auth.currentUser.updatePassword(password);

  updateEmail = email => this.auth.currentUser.updateEmail(email);

  getDoc = doc =>
    this.db
      .collection("downloadable-content")
      .doc(doc)
      .get();

  addScore = (uid, param, data) => {
    let progress = [];
    let keyIndex;
    this.users(uid)
      .collection("progress-tracking")
      .doc(param)
      .get()
      .then(doc => {
        if (doc.exists) {
          progress = doc.data()[param];
          keyIndex = progress.map(function (e) { return e.key; }).indexOf(data.key);
          return new Promise((resolve, reject) => {
            let latestScore = doc.data().progress;
            if (keyIndex === -1) {
              latestScore += parseInt(data.weightage);
              progress.push({
                key: data.key,
                status: data.status,
                ['first-access']: data.time,
                ['last-access']: '',
                weightage: parseInt(data.weightage)
              });
              resolve(this.users(uid)
                .collection("progress-tracking")
                .doc(param).update({
                  ['total-score']: parseInt(data.totalScore),
                  ['page-name']: param,
                  progress: parseInt(latestScore),
                  [param]: progress
                }))
            } else if (keyIndex !== -1) {
              progress[keyIndex]['last-access'] = new Date();
              resolve(this.users(uid)
                .collection("progress-tracking")
                .doc(param).update({
                  ['total-score']: parseInt(data.totalScore),
                  [param]: progress
                }))
            } else {
              reject("Data not added")
            }
          })
        } else {
          return this.users(uid).collection("progress-tracking")
            .doc(param).set({
              ['total-score']: parseInt(data.totalScore),
              ['page-name']: param,
              progress: parseInt(data.weightage),
              [param]: [{
                key: data.key,
                status: data.status,
                ['first-access']: data.time,
                ['last-access']: '',
                weightage: parseInt(data.weightage)
              }]
            })
        }
      });
  };

  uploadFiles = (folderName) => this.storage.ref(folderName)

  getDownloadUrl = (folderName, filename) => this.storage.ref(folderName).child(filename).getDownloadURL();

  setFileUrl = (data) => this.db.collection('files').add(data);

  getAllFilesLive = () => this.db.collection('files');

  getAllFiles = () => this.db.collection('files').get();

  getEmail = (uid) => this.users(uid).get();

  getTotalScore = (slug) => this.db.collection('pages').doc(slug).get();

  listenLiveProgress = (uid) => this.users(uid).collection("progress-tracking").onSnapshot;

  getScore = (uid, param) => this.users(uid).collection("progress-tracking").doc(param).get()

  getMenuLinks = (franchise) => this.db.collection("pages").where('franchise', '==', franchise).get();

  getLivePages = () => this.db.collection('pages')

  getLiveGallery = () => this.db.collection('files')

  createFranchise = (data) => this.db.collection(`franchises`).doc(`${data.slug}`).set({
    name: data.name,
    slug: data.slug,
    logo: data.logo,
    imageName: data.imageName,
  })

  deleteFranchiseForUpdate = (param) => this.db.collection('franchises').doc(param).delete()

  getUser = uid => this.db.collection('users').doc(uid).get();

  updateFranchise = data => {
    return new Promise((res, rej) => {
      this.deleteFranchiseForUpdate(data.docRef)
        .then(() => {
          this.db.collection(`franchises`).doc(`${data.slug}`).set({
            name: data.name,
            slug: data.slug,
            logo: data.logo,
            imageName: data.imageName,
          }, { merge: true })
            .then(() => {
              this.getMenuLinks(data.docRef)
                .then((navData) => {
                  if (navData.empty) {
                  } else {
                    navData.docs.forEach((item, index, array) => {
                      this.updateFranchisePage(item.data().link.link, data.slug);
                    })
                  }
                })
            })
            .then(() => {
              let newItemProcessed = 0;
              this.getAllUsers(data.docRef)
                .then((userData) => {
                  if (userData.empty) {
                    res('Franchise Updated but no user exists')
                  } else {
                    userData.docs.forEach((item, index, array) => {
                      this.userUpdate(item.data().uid, data.slug, res)
                      newItemProcessed++
                      if (newItemProcessed === array.length) {
                        res('pages updated')
                      }
                    })
                  }
                })
            })
        })
    })
  }

  userUpdate = (uid, franchiseData) =>  this.db.collection('users').doc(uid).update({
      franchise: franchiseData
    })

  updateFranchisePage = (page, updatedFranchise) => this.db.collection('pages').doc(page).update({
    'franchise': updatedFranchise,
  })

  updateUserFranchise = (uid, franchise) => this.db.collection('users').doc(uid).update({
    franchise: franchise,
  })
  
  updateUserRole = (uid, userrole) => this.db.collection('users').doc(uid).update({
    userrole: userrole
  })

  getFranchises = () => this.db.collection('franchises').get();

  getFranchiseData = (param) => this.db.collection('franchises').where('slug', "==", param).limit(1).get()

  deletePage = (param) => this.db.collection('pages').doc(param).delete();

  deleteFranchise = (param) => {
    this.db.collection('franchises').doc(param).delete().
      then(() => {
        this.getMenuLinks(param).then((data) => {
          data.docs.forEach(item => {
            this.deletePage(item.data().link.link);
          })
        })
      })
  }

  allUsers = () => this.db.collection('users').get();

  getLiveFranchise = () => this.db.collection('franchises');

  getProgress = (uid, param) =>
    this.users(uid)
      .collection("progress-tracking")
      .doc(param).get();

  getAllProgress = (uid) => this.users(uid).collection("progress-tracking").get();

  getLiveProgress = (uid) => this.users(uid).collection("progress-tracking");

  getUserRole = (uid) => this.users(uid).get();

  getAllUsers = (franchise) => this.db.collection('users').where('franchise', '==', franchise).get();

  addPage = (param) => this.db.collection('pages').doc(param);

  deletePage = (param) => this.db.collection('pages').doc(param).delete();

  updatePage = (param) => this.db.collection('pages').doc(param);

  totalScoreForAllPages = (franchise) => this.db.collection('pages').where('franchise', '==', franchise).get()

  getPage = param =>
    this.db
      .collection(`pages`)
      .doc(param)
      .get();
}

export default Firebase;
