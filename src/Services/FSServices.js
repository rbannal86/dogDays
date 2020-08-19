import app from "./Base";
const db = app.firestore();

const FSServices = {
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

  async getDog(dogId, userId) {
    return db.collection("dogs").where("userId", "==", userId).get();
  },

  async fetchUserData(userId) {
    let userRef = db.collection("users").doc(userId);
    let getDoc = userRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("User Does Not Exist");
        } else {
          return doc.data();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return getDoc;
  },

  async createDogArray(dogs) {
    let dogArray = [];
    dogs.map(async (dog) => {
      await this.fetchDogData(dog).then((res) => {
        dogArray.push(res);
      });
    });
    return dogArray;
  },

  fetchDogData(dogId) {
    let userRef = db.collection("dogs").doc(dogId);
    let getDoc = userRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("Dog Does Not Exist");
        } else {
          return doc.data();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return getDoc;
  },

  async registerNewUser(email, password, displayName) {
    console.log("registering new user");
    try {
      let user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      let userObj = {
        id: user.user.uid,
        displayName,
      };
      await db.collection("users").doc(userObj.id).set(userObj);
      return await this.fetchUserData(user.user.uid);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  //wire this up to set an array of dogId for the user
  async registerDog(userId, dogObj) {
    console.log("registering new dog");
    console.log(dogObj);
    dogObj.userId = userId;
    let dogId;

    try {
      await db
        .collection("dogs")
        .add(dogObj)
        .then((ref) => (dogId = ref.id));
      let userData = await db
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (!doc.exists) return console.log("User does not exist!");
          else return doc.data();
        });
      let dogs;
      if (userData.dogs) {
        dogs = userData.dogs;
      } else dogs = [];

      dogs.push(dogId);

      await db.collection("users").doc(userId).update({ dogs: dogs });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default FSServices;
