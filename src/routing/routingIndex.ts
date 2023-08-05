import userRouting from "./User";
import companyOrganisation from "./company";
import projectRouting from "./project";
import testimonialRouting from "./testimonial";
import videosRouting from "./video";
import notesRouting from "./notes";
import classRouting from "./class";
import examRouting from "./exam";
import quizRouting from "./quiz";
import StudentRouting from "./userTypes/student";

const importRoutings = (app: any) => {
  app.use("/api/auth", userRouting);
  app.use("/api/organisation", companyOrganisation);
  app.use("/api/project", projectRouting);
  app.use("/api/testimonial", testimonialRouting);
  app.use("/api/videos", videosRouting);
  app.use("/api/notes", notesRouting);
  app.use("/api/class", classRouting);
  app.use("/api/exam", examRouting);
  app.use("/api/quiz", quizRouting);
  app.use("/api/student", StudentRouting);
};

export default importRoutings;
