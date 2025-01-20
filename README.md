Quiz App built using NextJS, TypeScript, TailwindCSS, Redux, React Router DOM and React-toastify(notifications).

Built for website and mobile applications.

Link for the project: https://quizappfrontend-lake.vercel.app/

Approach:-

1. Make a landing page where the user enters their email, then go to the Quiz page, if not then alert them using notifications.

2. When the Quiz Page is mounted, then immediately fetch the API and use Card component to display the Questions and Answers.

3. The page automatically submits after 30 minutes, the user selects their answer and uses the navigation component to navigate between the questions.

4. After the submission, the user is redirected to the Report page in which displays the total marks of the user and all the questions along with the correct answer and the answer which the user has submitted.

Installation:-

1. Fork the repository into local machine.
2. Run "npm install".
3. Run "npm run dev".

Assumptions Made:-

1. User enters their correct email.

Challenges faced:

1. Storing the state of the correct answers and the fetched API : used local storage of the web browser for this.
2. Designing the timer : used online resources to overcome
   this.
3. Routing logic : used react router DOM.
