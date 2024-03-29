const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')
const Post = require('../models/Post')


// @desc Get courses
// @route GET /api/v1/courses
// @route GET /api/v1/posts/:postId/courses
// @access Public

exports.getCourses = asyncHandler(async (req, res, next) => {
    if (req.params.postId) {
        const courses = await Course.find({
            post: req.params.postId
        })
        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        })
    } else {
        res.status(200).json(res.advancedResults)
    }
})

// @desc Get course
// @route GET /api/v1/courses/:id
// @access Public

exports.getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path: 'post',
        select: 'name description'
    })

    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
    }

    res.status(200).json({
        success: true,
        data: course
    })

})

// @desc Add course
// @route POST /api/v1/posts/:postId/courses
// @access Private

exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.post = req.params.postId
    req.body.user = req.user.id;

    const post = await Post.findById(req.params.postId)

    if (!post) {
        return next(new ErrorResponse(`No Post with the id of ${req.params.postId}`), 404)
    }

    // Make sure user is Course owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update a course to ${post._id}`, 404));
    }

    const course = await Course.create(req.body)

    res.status(200).json({
        success: true,
        data: course
    })

})

// @desc Update course
// @route PUT /api/v1/courses/:id
// @access Private

exports.updateCourse = asyncHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id)

    if (!course) {
        return next(new ErrorResponse(`No Course with the id of ${req.params.id}`), 404)
    }

    // Make sure user is Post owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this course`, 404));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: course
    })

})

// @desc Delete course
// @route DELETE /api/v1/courses/:id
// @access Private

exports.deleteCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id)

    if (!course) {
        return next(new ErrorResponse(`No Course with the id of ${req.params.id}`), 404)
    }

    // Make sure user is Post owner
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this course`, 404));
    }

    await course.remove()

    res.status(200).json({
        success: true,
        data: {}
    })

})