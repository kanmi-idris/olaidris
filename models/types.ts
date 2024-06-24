import { Document } from "mongoose";

interface IContextualContent extends Document {
  render_order: number;
  type: "image" | "code";
  image_uri?: string;
  code_content?: string;
  explanation?: string;
}

export interface ISolution extends Document {
  explanation: string;
  context: IContextualContent[];
}

export interface IDecision extends Document {
  title: string;
  problem: {
    title: string;
    content: {
      intro: string;
      key_points: string[];
      closing: string;
    };
  };
  solution: ISolution[];
}

export interface IProject extends Document {
  project_name: string;
  project_date: string;
  project_uri: string;
  decisions: IDecision[];
}

export interface IUpload extends Document {
  type: string;
  uri: string;
}

export interface IAccolade extends Document {
  name: string;
  accolade: string;
  date_received: Date;
  source_platform?: string;
  source_uri?: string;
}

export interface ICertificate extends Document {
  sponsor: string;
  title: string;
  awarding_date: Date;
  createdAt?: Date;
  logo_uri?: string;
  proof_uri?: string;
}

export interface IEducation extends Document {
  school: string;
  programme: string;
  location: {
    state: string;
    country: string;
  };
  duration: {
    startDate: Date;
    endDate: Date;
  };
  school_logo_uri?: string;
}

export interface IExperience extends Document {
  company: string;
  location: {
    state: string;
    country: string;
  };
  title: string;
  duration: {
    startDate: Date;
    endDate: Date;
  };
  achievements: string[];
  company_logo_uri?: string;
}

export interface IUser extends Document {
  googleId?: string;
  email: string;
  password: string;
  refreshToken: string;
  accessToken?: string;
}
