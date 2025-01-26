const mongoose = require('mongoose');
const slugify = require('slugify');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: {
        type: String,
        unique: true
    },
    isChecked: { type: Boolean, default: false },
    show: { type: Boolean, default: true },
    description: { type: String },
    content: { type: String },
    like: { type: Number, default: 0 },
    emotion: [
        {
            name: { type: String },
            emotionAt: { type: Date, default: Date.now }
        }
    ],
    fullName: { type: String },
    deleted: { type: Boolean, default: false },
}, {
    timestamps: true
});

NewsSchema.pre('save', async function (next) {
    if (this.isModified('title')) {
        const date = new Date();
        const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        this.slug = slugify(`${this.title} ${dateString}`, { lower: true, strict: true });
    }
    next();
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
