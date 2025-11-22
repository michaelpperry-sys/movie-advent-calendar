# 🎬 Movie Advent Calendar 🎄

A festive holiday movie advent calendar web app that runs from Black Friday (November 28) through Christmas Day (December 25) - 28 days of curated holiday films!

## ✨ Features

### 📅 Calendar Structure
- **28 boxes** arranged in a beautiful, responsive grid
- Boxes unlock at **midnight** based on your local timezone
- Three visual states:
  - 🔒 **Locked** (future dates)
  - 🎁 **Unlocked** (available to open)
  - 🎬 **Opened** (already revealed)

### 🎥 Movie Selection
The calendar features a carefully curated selection of holiday movies organized by tiers:

**Early Days (Nov 28 - Dec 7)**: Lighter fare and newer streaming movies
- Klaus, The Princess Switch, Jingle Jangle, and more!

**Middle Days (Dec 8 - Dec 18)**: Quirky picks, horror-Christmas hybrids, and surprising gems
- Rare Exports, Krampus, Tokyo Godfathers, The Holdovers, Die Hard, and more!

**Late Days (Dec 19 - Dec 24)**: Classic holiday films building toward Christmas
- It's a Wonderful Life, Elf, Love Actually, White Christmas, and more!

**Special Assignments**:
- 🎅 **December 25**: Double feature - "The Muppet Christmas Carol" AND "A Charlie Brown Christmas"
- 📺 **November 28** (Black Friday): "Falling for Christmas"
- 🎭 **Random Weekend**: "Fanny and Alexander" (3+ hours epic)
- 🏠 **December 20-24**: "Home Alone" (randomly assigned)

### 🔗 Shareability
- Each calendar has a **unique shareable URL**
- Share with family and friends - they'll see the same movie sequence!
- Opened boxes are tracked **independently per user**
- Your wife can have her own progress while sharing your calendar

### 💾 Persistence
- Movie sequences stored in localStorage
- Your progress saved automatically
- Same calendar persists across browser sessions
- Reset button activates on **December 26th**

### 🎨 Visual Design
- Elegant **gold, green, and silver** color scheme
- Festive animations and effects
- Gentle snowfall background
- Smooth transitions and reveals
- **Fully responsive** (works on phones, tablets, and desktops)

## 🚀 Getting Started

### Simple Setup
1. Open `index.html` in any modern web browser
2. That's it! No build process, no dependencies required

### Sharing Your Calendar
1. Click the **"📤 Share Calendar"** button
2. Copy the generated URL
3. Send it to anyone you want to share your calendar with
4. They'll see the same movies but track their own progress

### Using a Shared Calendar
1. Click the shared link someone sent you
2. The calendar will load with their movie sequence
3. Your opened boxes are tracked separately
4. Bookmark it to return to the same calendar

## 🎯 How It Works

### Date-Based Unlocking
- Boxes unlock at **midnight** in your local timezone
- Past dates can be opened at any time
- Future dates remain locked until their day arrives

### Movie Reveal
- Click any unlocked box to reveal that day's movie
- See the movie poster and title in a beautiful modal
- Boxes turn red once opened

### Reset Functionality
- Reset button becomes active on **December 26th**
- Clears your opened boxes and generates a new sequence
- Creates a fresh calendar code for sharing

## 🛠️ Technical Details

### Built With
- **HTML5** - Structure
- **CSS3** - Styling with custom animations
- **Vanilla JavaScript** - No frameworks, no dependencies
- **TMDB** - Movie poster images

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript and localStorage enabled

### Data Storage
All data is stored locally in your browser using localStorage:
- `movieSequence_[code]` - The movie order for a specific calendar
- `openedBoxes_[code]_user` - Your personal progress

## 🎬 Movie List

The calendar includes 30+ carefully curated films, avoiding Hallmark-style movies and unfunny cash grabs. The selection features:

- Classic holiday films
- Horror-Christmas hybrids
- Romantic comedies
- Quirky independent films
- International cinema
- Modern streaming favorites
- Timeless masterpieces

## 📱 Responsive Design

The calendar adapts beautifully to any screen size:
- **Desktop**: 7-column grid with large boxes
- **Tablet**: 4-5 column grid
- **Mobile**: 3-4 column grid with optimized touch targets

## 🎄 Perfect For

- Couples planning their holiday movie watching
- Families with a shared love of cinema
- Friend groups doing a virtual movie marathon
- Anyone who loves holiday films and advent calendars!

## 🔐 Privacy

- All data stored locally in your browser
- No server, no tracking, no accounts needed
- Share only with people you trust (URL grants access)

## 🎁 Tips

1. **Create one calendar** and share with your partner
2. **Check daily** to see what movie unlocks
3. **Plan your viewing** - some movies are 3+ hours!
4. **Use the share link** as a bookmark so you don't lose your calendar
5. **After Christmas**, use the reset button to create next year's calendar

## 📄 License

Free to use and modify for personal use. Movie posters and information are property of their respective copyright holders.

---

**Happy Holidays and Enjoy Your Movie Marathon! 🎬🎄**
