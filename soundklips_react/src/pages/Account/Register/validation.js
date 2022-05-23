
const validateFormData = (values) => {
  let errors = {}

  if(!values.email) {
    errors.email = "Email required"
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email address was invalid"
  }
  
  if(!values.password) {
    errors.password = "Password required"
  } else if(values.password.length < 6) {
    errors.password = "Password must be more than 6 characters"
  }

  if(!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password"
  } else if(values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match"
  }

  return errors
}


export default validateFormData