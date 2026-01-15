const Session = require("../Models/Session");
const Question = require("../Models/Question");

// @desc Create a new session and linked  questions
// @route POST/api/sessions/create
// @access Private

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicToFocus, description, questions } = req.body;
    const userId = req.user._id; // Assuming uh have a middleware seting req.user

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    session.questions = questionDocs;
    await session.save();
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get all sessions for the logged in user
// @routes GET /api/sessions/my-sessions
// @access private

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("question");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get a session by ID with populated questions
// 2route GET/api/sessions/:id
// @access Private

exports.getSessionById = async (req, res) => {
  try {
   const session = await Session.findById(req.params.id)
.populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: 1 } },
    });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//  @ desc Delete a session and its question

// @routes DELETE/api/sessions/:id
// @access Private

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.param.id);
    if (!session) {
  return res.status(404).json({ message: "Session not found" });
}


    // first, delete all questions linked to this session

    await Question.deleteMany({ session: session._id });
    // then delete the session
    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
