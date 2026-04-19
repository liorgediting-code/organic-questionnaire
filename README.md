# LiorEdits - שאלון אסטרטגיית תוכן אורגני

שאלון אינטייק ללקוחות חדשים של LiorEdits לשירות סרטונים אורגניים.
כתוב ב-HTML/CSS/JS vanilla, עברית RTL, שולח תשובות ל-webhook של Make.com.

## מבנה הפרויקט

```
questionnaire-project/
├── index.html       # השאלון עצמו
├── config.js        # קובץ הגדרות (webhook URL)
├── build.js         # סקריפט build שמזריק env variables
├── package.json     # הגדרות Node
├── vercel.json      # הגדרות Vercel
└── README.md        # הקובץ הזה
```

## איך זה עובד

1. הלקוח פותח את האתר וממלא את השאלון
2. בסיום, הטופס שולח POST request ל-webhook URL של Make.com
3. ב-Make, הנתונים נכנסים ל-Monday CRM ואפשר להפעיל אוטומציות נוספות (WhatsApp, מייל, Claude processing)

ה-webhook URL **לא** מוקשח בקוד. הוא מגיע ממשתנה סביבה של Vercel.

---

## הגדרת Make.com Webhook

1. היכנס ל-Make.com וצור Scenario חדש
2. הוסף מודול "Webhooks > Custom webhook"
3. לחץ "Add" ואז "Copy address to clipboard" - זה ה-URL שתצטרך
4. הוסף מודולים הבאים לפי הצורך:
   - Monday.com > Create an Item
   - Google Sheets > Add a Row (לגיבוי)
   - Gmail > Send Email (התראה אליך)
   - WhatsApp (Green API) > Send Message (הודעת אוטומטית ללקוח)
5. שמור והפעל את ה-Scenario

**טיפ:** בפעם הראשונה שתשלח שאלון, Make יזהה את מבנה ה-JSON אוטומטית. זה יקל עליך למפות שדות למודולים.

---

## דפלוי ל-Vercel דרך GitHub

### שלב 1: העלאה ל-GitHub

פתח טרמינל בתיקייה `questionnaire-project`:

```bash
cd questionnaire-project
git init
git add .
git commit -m "Initial commit - questionnaire v1"
gh repo create lioredits-questionnaire --public --source=. --remote=origin --push
```

אם אין לך `gh` CLI, צור את ה-repo ידנית ב-GitHub ואז:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lioredits-questionnaire.git
git branch -M main
git push -u origin main
```

### שלב 2: חיבור ל-Vercel

1. היכנס ל-[vercel.com](https://vercel.com) ולחץ "Add New Project"
2. בחר את ה-repo `lioredits-questionnaire` מ-GitHub
3. בעמוד ההגדרות, פתח "Environment Variables" ותוסיף:
   - **Key:** `WEBHOOK_URL`
   - **Value:** ה-URL שקיבלת מ-Make.com
   - **Environment:** Production, Preview, Development (סמן הכל)
4. לחץ "Deploy"

תוך 30 שניות יהיה לך URL של ורסל (למשל `lioredits-questionnaire.vercel.app`).

### שלב 3: חיבור דומיין מותאם (אופציונלי)

אם יש לך דומיין:
1. ב-Vercel > Project Settings > Domains
2. הוסף דומיין (למשל `intake.lioredits.com`)
3. עדכן DNS אצל רשם הדומיין לפי ההוראות של Vercel

---

## עדכונים עתידיים

כדי לעדכן את השאלון:

```bash
# ערוך את index.html
git add index.html
git commit -m "update questionnaire text"
git push
```

Vercel יעשה deploy אוטומטי תוך שניות.

---

## בדיקה לוקלית

כדי לבדוק את השאלון במחשב לפני העלאה:

```bash
# אפשרות 1: פתח את index.html ישירות בדפדפן
# (חשוב - עם Live Server של VS Code או דרך python)

python -m http.server 8000
# פתח http://localhost:8000

# אפשרות 2: אם אתה רוצה לבדוק את ה-webhook במצב לוקלי
# ערוך את config.js והחלף ידנית את __WEBHOOK_URL_PLACEHOLDER__ ל-URL האמיתי
# (זכור להחזיר לפני הdפלוי!)
```

---

## מבנה הנתונים שנשלח

כל שליחה של השאלון שולחת JSON כזה ל-webhook:

```json
{
  "full_name": "ישראל ישראלי",
  "business_name": "ישראל ישראלי - מאמן עסקי",
  "business_category": "מאמן עסקי",
  "grandma_pitch": "...",
  "years_in_field": "7",
  "website_url": "https://...",
  "ideal_client": "...",
  "main_pain": "...",
  "tried_before": "...",
  "why_failed": "...",
  "objections": "...",
  "biggest_myth": "...",
  "competitors_wrong": "...",
  "what_different": "...",
  "why_they_picked_you": "...",
  "what_you_fight": "...",
  "origin_story": "...",
  "rock_bottom": "...",
  "success_stories": "...",
  "credentials": "...",
  "proof_numbers": "...",
  "main_service": "...",
  "transformation": "...",
  "first_results": "תוך שבועיים",
  "unique_value": "...",
  "tone_style": "direct",
  "catchphrases": "...",
  "never_say": "...",
  "creator_inspiration": "...",
  "creator_avoid": "...",
  "main_goal": "support_ads",
  "success_metric": "...",
  "video_experience": "some",
  "camera_comfort": "7",
  "client_filming": "yes_already",
  "existing_content": "yes_some",
  "testimonials": "...",
  "visual_assets": "...",
  "viral_dream": "...",
  "anything_else": "...",
  "submitted_at": "2026-04-19T10:30:00.000Z",
  "user_agent": "...",
  "source": "lioredits-questionnaire"
}
```

---

## Troubleshooting

### השאלון לא נשלח

1. פתח Console בדפדפן (F12) וראה שגיאות
2. בדוק שה-WEBHOOK_URL הוגדר ב-Vercel
3. בדוק ש-Make.com Scenario פעיל (כפתור ON בפינה השמאלית)
4. נסה לשלוח ב-Make בעצמך את ה-webhook עם `curl` כדי לוודא שהוא תקין

### ה-env variable לא נטען

- ודא שעשית redeploy אחרי שהוספת את ה-env variable (Vercel לא עושה רענון אוטומטי)
- בדוק ב-Deploy Logs שהסקריפט `build.js` רץ בהצלחה

### שגיאת CORS

Make.com webhook צריך לקבל את הבקשה כ-JSON. אם יש שגיאת CORS, בדוק ב-Make את הגדרות ה-webhook שקיבל אותו כ-"accept any origin".
