import app from "./Base";
const db = app.firestore();

const FSServices = {
  //Gets all date for one dog, based on dog Id
  async fetchDogRecords(dogId) {
    return await db
      .collection("dogs")
      .doc(dogId)
      .get()
      .then((doc) => {
        if (!doc.exists) console.log("Record Does Not Exist");
        else return doc.data();
      });
  },

  //Gets list of all dogs attached to user
  async fetchAllDogRecords(userId) {
    return await db.collection("dogs").where("userId", "==", userId).get();
  },

  //Gets all user records based on userId
  async fetchUserRecords(userId) {
    return await db
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (!doc.exists) console.log("Record Does Not Exist");
        else return doc.data();
      });
  },

  //Updates dog record when record is added to or activity is deleted
  async updateDogRecord(dogId, record) {
    let dogObj = await db
      .collection("dogs")
      .doc(dogId)
      .get()
      .then((doc) => {
        if (!doc.exists) console.log("Record Does Not Exist");
        else return doc.data();
      });
    dogObj.record = {};
    dogObj.record = record;
    db.collection("dogs").doc(dogId).set(dogObj);
  },

  //Updates dog details when the user changes name, etc.
  async updateDogDetails(dogId, name, breed, date) {
    let dogObj = await db
      .collection("dogs")
      .doc(dogId)
      .get()
      .then((doc) => {
        if (!doc.exists) console.log("Record Does Not Exist");
        else return doc.data();
      });
    dogObj.dogName = name;
    dogObj.dogBreed = breed;
    dogObj.dogBirthday = date;
    db.collection("dogs").doc(dogId).set(dogObj);
  },

  //Handles adding new dog. Creates new dog in dogs collection, then
  //Adds dog id to user data
  async addDog(dogName, dogBreed, dogBirthday, userId) {
    let dogObj = {
      dogName,
      dogBreed,
      dogBirthday,
      record: {},
      userId,
    };
    const res = await db.collection("dogs").add(dogObj);
    dogObj.id = res.id;
    await db.collection("dogs").doc(dogObj.id).set(dogObj);
    let userObj = await db
      .collection("users")
      .doc(userId)
      .get()
      .then((res) => {
        let updated = res.data();
        updated.dogs.push(dogObj.id);
        return updated;
      });

    await db.collection("users").doc(userId).set(userObj);
    return { userObj, dogId: dogObj.id };
  },

  //Deletes dog from dogs collection and removes id from dogs in
  //user data.
  async deleteDog(dogId, userData) {
    await db.collection("dogs").doc(dogId).delete();
    let updatedUserData = userData;
    updatedUserData.dogs = userData.dogs.filter((dog) => dog !== dogId);
    await db.collection("users").doc(userData.id).set(updatedUserData);
    return updatedUserData;
  },

  //Standard sign in
  async signInUser(email, password) {
    return await app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return user.user.uid;
      })
      .catch((error) => {
        const err = {
          code: error.code,
          message: error.message,
        };
        return err;
      });
  },

  //Standard register
  async registerNewUser(email, password, displayName) {
    try {
      let user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      let userObj = {
        id: user.user.uid,
        displayName,
        dogs: [],
      };
      await db.collection("users").doc(userObj.id).set(userObj);
      return await this.fetchUserRecords(user.user.uid);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default FSServices;
