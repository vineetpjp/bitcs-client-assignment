export class GenUtil {
  static validateTripBeforeSubmit(trip) {
    const { destination, startDate, endDate, comment } = trip;
    if (destination.length < 3) {
      return "Destination should be atLeast 3 characters long";
    }
    if (!startDate) {
      return "Start Date is required";
    }
    if (!endDate) {
      return "End Date is required";
    }
    if (comment.length < 10) {
      return "Comment should be atLeast 10 characters long";
    }
    return null;
  }

  static validateUserBeforeSubmit(loginAndSignUp) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password, name } = loginAndSignUp;
    if (name?.length < 3) {
      return "Name should be alLeast 3 characters long!";
    }
    if (!email.match(regexEmail)) {
      return "Email is not Valid!!";
    }
    if (password.length < 3) {
      return "Password should be alLeast 3 characters long!";
    }

    return null;
  }
}
