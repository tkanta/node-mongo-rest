const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }
    ],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

//-- virtual mapping between user and Task --
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner' 
})

//-- called when JSON.stringify(user) is called during response is sent.--
userSchema.methods.toJSON = function () {
    user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.__v
    delete userObject.avatar

    return userObject
}

//-- instance method for generating token --
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: this._id.toString()}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//--static method for login--
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) throw new Error('Login failed')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('login failed')
    return user
}

//--hash password before saving--
userSchema.pre('save', async function(next) {
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

// --- remove all Tasks when user deleted ----
userSchema.pre('remove', async function(next) {
     const user = this
     await Task.deleteMany({owner: user._id})
     next()
})

// --- User Model ------
const User = mongoose.model('User', userSchema)

module.exports = User