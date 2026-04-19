import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/job.model.js";
import Company from "../models/company.model.js";

dotenv.config();



const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB: ${conn.connection.name}`); // <-- shows actual DB name

    await Job.deleteMany({});
    await Company.deleteMany({});
    console.log("🗑️  Cleared existing jobs and companies");

    const companies = await Company.insertMany([
      {
        name: "Google",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=google.com",
        location: "Remote",
      },
      {
        name: "Amazon",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=amazon.com",
        location: "Gurugram",
      },
      {
        name: "Microsoft",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=microsoft.com",
        location: "Bangalore",
      },
      {
        name: "Netflix",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=netflix.com",
        location: "Remote",
      },
      {
        name: "Meta",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=meta.com",
        location: "Hyderabad",
      },
      {
        name: "Adobe",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=adobe.com",
        location: "Pune",
      },
      {
        name: "Flipkart",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=flipkart.com",
        location: "Remote",
      },
      {
        name: "Zomato",
        logo: "https://www.google.com/s2/favicons?sz=128&domain=zomato.com",
        location: "Delhi",
      },
    ]);

    console.log(`Inserted ${companies.length} companies`);

    // Map company names to their ObjectIds for easy reference
    const co = {};
    companies.forEach((c) => (co[c.name] = c._id));

    const jobs = [
      {
        title: "Frontend Intern",
        company: co["Google"],
        location: "Remote",
        salary: 25000,
        description: "Build responsive React UIs with Tailwind CSS. Work with design teams to implement pixel-perfect interfaces.",
        requirements: ["React", "Tailwind CSS", "JavaScript", "Git"],
        position: 5,
        jobType: "Internship",
        experienceLevel: "Beginner",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Backend Intern",
        company: co["Amazon"],
        location: "Gurugram",
        salary: 15000,
        description: "Develop and maintain REST APIs using Node.js and Express. Work with MongoDB databases.",
        requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
        position: 3,
        jobType: "Internship",
        experienceLevel: "Beginner",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "UI Designer",
        company: co["Microsoft"],
        location: "Bangalore",
        salary: 65000,
        description: "Design cohesive UI systems and component libraries. Collaborate with product and engineering teams.",
        requirements: ["Figma", "Design Systems", "Prototyping", "User Research"],
        position: 4,
        jobType: "Full-time",
        experienceLevel: "Junior",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Backend Developer",
        company: co["Netflix"],
        location: "Mumbai",
        salary: 85000,
        description: "Build scalable microservices and APIs. Optimize database queries and system performance.",
        requirements: ["Node.js", "Microservices", "PostgreSQL", "Docker"],
        position: 2,
        jobType: "Full-time",
        experienceLevel: "Junior",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "DevOps Engineer",
        company: co["Amazon"],
        location: "Gurugram",
        salary: 160000,
        description: "Manage CI/CD pipelines and cloud infrastructure. Automate deployments and monitor system health.",
        requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        position: 2,
        jobType: "Full-time",
        experienceLevel: "Mid",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Mobile App Developer",
        company: co["Microsoft"],
        location: "Bangalore",
        salary: 220000,
        description: "Develop cross-platform mobile apps for iOS and Android using React Native.",
        requirements: ["React Native", "iOS", "Android", "TypeScript"],
        position: 1,
        jobType: "Full-time",
        experienceLevel: "Mid",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Security Engineer",
        company: co["Adobe"],
        location: "Pune",
        salary: 200000,
        description: "Secure cloud infrastructure and conduct vulnerability assessments. Build security tools and processes.",
        requirements: ["Cloud Security", "Penetration Testing", "AWS", "Python"],
        position: 3,
        jobType: "Full-time",
        experienceLevel: "Mid",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Blockchain Developer",
        company: co["Flipkart"],
        location: "Remote",
        salary: 280000,
        description: "Build Web3 decentralized applications and smart contracts on Ethereum.",
        requirements: ["Solidity", "Ethereum", "Web3.js", "React"],
        position: 4,
        jobType: "Contract",
        experienceLevel: "Mid",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Senior AI Engineer",
        company: co["Google"],
        location: "Remote",
        salary: 350000,
        description: "Lead development of production ML systems. Design model training pipelines and inference infrastructure.",
        requirements: ["Python", "PyTorch", "MLOps", "Kubernetes", "LLMs"],
        position: 1,
        jobType: "Full-time",
        experienceLevel: "Senior",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Data Analyst",
        company: co["Zomato"],
        location: "Delhi",
        salary: 70000,
        description: "Analyze business data to drive product decisions. Build dashboards and reports using SQL and Python.",
        requirements: ["SQL", "Python", "Tableau", "Excel", "Statistics"],
        position: 2,
        jobType: "Full-time",
        experienceLevel: "Junior",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "ML Engineer",
        company: co["Meta"],
        location: "Hyderabad",
        salary: 300000,
        description: "Build and deploy machine learning models at scale. Work with recommendation systems and NLP pipelines.",
        requirements: ["Python", "TensorFlow", "Spark", "MLflow", "SQL"],
        position: 2,
        jobType: "Full-time",
        experienceLevel: "Senior",
        created_by: new mongoose.Types.ObjectId(),
      },
      {
        title: "Full Stack Developer",
        company: co["Zomato"],
        location: "Delhi",
        salary: 120000,
        description: "Build end-to-end features across React frontend and Node.js backend. Own complete product features.",
        requirements: ["React", "Node.js", "MongoDB", "Redis", "TypeScript"],
        position: 3,
        jobType: "Full-time",
        experienceLevel: "Mid",
        created_by: new mongoose.Types.ObjectId(),
      },
    ];

    const inserted = await Job.insertMany(jobs);
    console.log(` Inserted ${inserted.length} jobs`);

    //Verifying
    const sample = await Job.findOne().populate("company", "name logo location");
    console.log("\n Sample job with populated company:");
    console.log(`  Title: ${sample.title}`);
    console.log(`  Company: ${sample.company.name}`);
    console.log(`  Logo URL: ${sample.company.logo}`);
    console.log(`  Location: ${sample.company.location}`);

    console.log("\n SEEDING COMPLETE — all jobs and companies inserted");
    process.exit(0);
  } catch (err) {
    console.error(" Seed failed:", err);
    process.exit(1);
  }
};

seedDB();