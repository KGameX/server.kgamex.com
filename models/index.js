const User = require('./user.model')
const Role = require('./role.model')
const Locale = require('./locale.model')
const BlogStatus = require('./blog_status.model')
const BlogArticle = require('./blog_article.model')
const BlogLocale = require('./blog_locale.model')
const BlogComment = require('./blog_comment.model')
const Question = require('./question.model')
const Answer = require('./answer.model')
const Video = require('./video.model')
const VideoLocale = require('./video_locale.model')
const PasswordHistory = require('./password_history.model')
const Playlist = require('./playlist.model')
const PlaylistLocale = require('./playlist_locale.model')
const PlaylistLine = require('./playlist_line.model')
const Scene = require('./scene.model')
const SceneLocale = require('./scene_locale.model')
const Series = require('./series.model')
const SeriesLocale = require('./series_locale.model')
const SeriesLine = require('./series_line.model')

const sequelize = require('../database')

// User associations
Role.hasMany(User, { foreignKey: 'role_id' })
User.belongsTo(Role, { foreignKey: 'role_id' })

User.hasMany(PasswordHistory, { foreignKey: 'user_id' })
PasswordHistory.belongsTo(User, { foreignKey: 'user_id' })

// Blog Article associations
BlogStatus.hasMany(BlogArticle, { foreignKey: 'status_id' })
BlogArticle.belongsTo(BlogStatus, { foreignKey: 'status_id' })

BlogArticle.hasMany(BlogLocale, { foreignKey: 'article_id' })
BlogLocale.belongsTo(BlogArticle, { foreignKey: 'article_id' })

Locale.hasMany(BlogLocale, { foreignKey: 'locale_id' })
BlogLocale.belongsTo(Locale, { foreignKey: 'locale_id' })

// Blog Comment associations
User.hasMany(BlogComment, { foreignKey: 'user_id' })
BlogComment.belongsTo(User, { foreignKey: 'user_id' })

BlogArticle.hasMany(BlogComment, { foreignKey: 'article_id' })
BlogComment.belongsTo(BlogArticle, { foreignKey: 'article_id' })

// Question associations
User.hasMany(Question, { foreignKey: 'user_id' })
Question.belongsTo(User, { foreignKey: 'user_id' })

Question.hasOne(Answer, { foreignKey: 'question_id' })
Answer.belongsTo(Question, { foreignKey: 'question_id' })

// Video associations
Video.hasMany(VideoLocale, { foreignKey: 'video_id' })
VideoLocale.belongsTo(Video, { foreignKey: 'video_id' })

Locale.hasMany(VideoLocale, { foreignKey: 'locale_id' })
VideoLocale.belongsTo(Locale, { foreignKey: 'locale_id' })

Video.hasMany(PlaylistLine, { foreignKey: 'video_id' })
PlaylistLine.belongsTo(Video, { foreignKey: 'video_id' })

// Playlist associations
Playlist.hasMany(PlaylistLine, { foreignKey: 'playlist_id' })
PlaylistLine.belongsTo(Playlist, { foreignKey: 'playlist_id' })

Playlist.hasMany(PlaylistLocale, { foreignKey: 'playlist_id' })
PlaylistLocale.belongsTo(Playlist, { foreignKey: 'playlist_id' })

Locale.hasMany(PlaylistLocale, { foreignKey: 'locale_id' })
PlaylistLocale.belongsTo(Locale, { foreignKey: 'locale_id' })

// Scene associations
Scene.hasMany(SceneLocale, { foreignKey: 'scene_id' })
SceneLocale.belongsTo(Scene, { foreignKey: 'scene_id' })

Locale.hasMany(SceneLocale, { foreignKey: 'locale_id' })
SceneLocale.belongsTo(Locale, { foreignKey: 'locale_id' })

Scene.hasMany(SeriesLine, { foreignKey: 'scene_id' })
SeriesLine.belongsTo(Scene, { foreignKey: 'scene_id' })

// Series associations
Series.hasMany(SeriesLocale, { foreignKey: 'series_id' })
SeriesLocale.belongsTo(Series, { foreignKey: 'series_id' })

Locale.hasMany(SeriesLocale, { foreignKey: 'locale_id' })
SeriesLocale.belongsTo(Locale, { foreignKey: 'locale_id' })

Series.hasMany(SeriesLine, { foreignKey: 'series_id' })
SeriesLine.belongsTo(Series, { foreignKey: 'series_id' })

sequelize.sync({ alter: true })

module.exports = {
    User,
    Role,
    Locale,
    BlogStatus,
    BlogArticle,
    BlogLocale,
    BlogComment,
    Question,
    Answer,
    Video,
    VideoLocale,
    Playlist,
    PlaylistLocale,
    PlaylistLine,
    Scene,
    SceneLocale,
    Series,
    SeriesLocale,
    SeriesLine
}