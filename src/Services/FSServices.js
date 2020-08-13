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
};

export default FSServices;
