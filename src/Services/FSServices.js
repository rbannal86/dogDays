import app from "./Base";
import STORE from "./STORE";
const db = app.firestore();

const FSServices = {
  updateStore(newStore) {
    console.log(newStore);
  },
  //   async fetchDogRecords(dateId, dogId) {
  //     return db
  //       .collection("dogs")
  //       .doc(dogId)
  //       .collection("records")
  //       .doc(dateId)
  //       .get()
  //       .then((doc) => {
  //         if (!doc.exists) {
  //           console.log("Records Do Not Exist");
  //         } else {
  //           return doc.data();
  //         }
  //       });
  //   },

  //   async getRecords(dogId) {
  //     return db
  //       .collection("dogs")
  //       .doc(dogId)
  //       .collection("records")
  //       .get()
  //       .then((snapshot) => {
  //         snapshot.forEach((doc) => console.log(doc.data()));
  //       });
  //   },

  //   async signInUser(email, password) {
  //     return await app
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then((user) => {
  //         return user.user.uid;
  //       })
  //       .catch((error) => {
  //         const err = {
  //           code: error.code,
  //           message: error.message,
  //         };
  //         return err;
  //       });
  //   },

  //   async getDog(userId) {
  //     return db.collection("dogs").where("userId", "==", userId).get();
  //   },

  //   async fetchUserData(userId) {
  //     let userRef = db.collection("users").doc(userId);
  //     let getDoc = userRef
  //       .get()
  //       .then((doc) => {
  //         if (!doc.exists) {
  //           console.log("User Does Not Exist");
  //         } else {
  //           return doc.data();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     return getDoc;
  //   },

  //   async createDogArray(dogs) {
  //     let dogArray = [];
  //     dogs.map(async (dog) => {
  //       await this.fetchDogData(dog).then((res) => {
  //         dogArray.push(res);
  //       });
  //     });
  //     return dogArray;
  //   },

  //   fetchDogData(dogId) {
  //     let userRef = db.collection("dogs").doc(dogId);
  //     let getDoc = userRef
  //       .get()
  //       .then((doc) => {
  //         if (!doc.exists) {
  //           console.log("Dog Does Not Exist");
  //         } else {
  //           return doc.data();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     return getDoc;
  //   },

  //   async registerNewUser(email, password, displayName) {
  //     console.log("registering new user");
  //     try {
  //       let user = await app
  //         .auth()
  //         .createUserWithEmailAndPassword(email, password);
  //       let userObj = {
  //         id: user.user.uid,
  //         displayName,
  //       };
  //       await db.collection("users").doc(userObj.id).set(userObj);
  //       return await this.fetchUserData(user.user.uid);
  //     } catch (error) {
  //       console.log(error);
  //       return error;
  //     }
  //   },

  //   // async creatMonthRecord(docId, dogId) {
  //   //   const monthRef = db.collection('dogs').doc(dogId).collection('records')

  //   //   monthRef.set
  //   // },

  //   async submitActivity(docId, dayId, activityObj, dogId) {
  //     const recordRef = db
  //       .collection("dogs")
  //       .doc(dogId)
  //       .collection("records")
  //       .doc(docId);
  //     const doc = await recordRef.get();
  //     // if (!doc.exists) console.log("Record doesn't exist!");
  //     // else {
  //     let monthData = doc.data();
  //     let dayData;
  //     console.log(monthData);
  //     if (monthData && monthData[dayId]) dayData = monthData[dayId];
  //     else dayData = { activities: [], aggregate: 0 };

  //     if (monthData === undefined) monthData = {};

  //     dayData.activities.push(activityObj);
  //     let totalScore = 0;
  //     dayData.activities.map((day) => {
  //       return (totalScore = day.score + totalScore);
  //     });

  //     let updatedAggregate = totalScore / dayData.activities.length;

  //     dayData.aggregate = updatedAggregate;

  //     monthData[dayId] = dayData;

  //     await db
  //       .collection("dogs")
  //       .doc(dogId)
  //       .collection("records")
  //       .doc(docId)
  //       .set(monthData);
  //     // }
  //   },

  //   //wire this up to set an array of dogId for the user
  //   async registerDog(userId, dogObj) {
  //     dogObj.userId = userId;
  //     let dogId;

  //     try {
  //       await db
  //         .collection("dogs")
  //         .add(dogObj)
  //         .then((ref) => (dogId = ref.id));
  //       let userData = await db
  //         .collection("users")
  //         .doc(userId)
  //         .get()
  //         .then((doc) => {
  //           if (!doc.exists) return console.log("User does not exist!");
  //           else return doc.data();
  //         });
  //       let dogs;
  //       if (userData.dogs) {
  //         dogs = userData.dogs;
  //       } else dogs = [];

  //       dogs.push(dogId);

  //       await db.collection("users").doc(userId).update({ dogs: dogs });
  //       await db.collection("dogs").doc(dogId).update({ id: dogId });
  //     } catch (error) {
  //       console.log(error);
  //       return error;
  //     }
  //   },
};

export default FSServices;
