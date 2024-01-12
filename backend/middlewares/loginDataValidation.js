const loginDataValidation = (req, res, next) => {

    const { email, password } = req.body
    if(email === '' || password === '')
      res.json({ msg: "Fill the details completely" })
    else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      res.json({ msg: "Enter valid email" })
    else if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))
      res.json({ msg: "Enter valid password" })
    else
      next()
}

module.exports = loginDataValidation