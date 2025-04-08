
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  FileSearch, 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight,
  Building2,
  Search,
  BarChart3,
  Star,
  Users
} from "lucide-react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/jobs?search=${searchTerm}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-jobright-blue border-jobright-blue/20 hover:bg-blue-200">
              AI-Powered Job Matching
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-hero-gradient">
              Find Your Perfect Job Match With AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload your resume and get instantly matched to jobs that fit your skills, experience, and preferences with our AI-powered job matching platform.
            </p>
            <form onSubmit={handleSubmit} className="flex max-w-lg mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  className="pl-10 py-6 text-lg rounded-l-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" className="text-lg py-6 px-8 rounded-r-lg bg-jobright-blue">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-jobright-blue to-jobright-purple">
                <Link to="/resume">Upload Resume</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Briefcase className="text-jobright-blue h-6 w-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-500">Available Jobs</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-50 p-3 rounded-full">
                  <Building2 className="text-jobright-purple h-6 w-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">2,500+</h3>
              <p className="text-gray-500">Partner Companies</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-50 p-3 rounded-full">
                  <Users className="text-green-600 h-6 w-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">85%</h3>
              <p className="text-gray-500">Success Rate</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-jobright-purple border-jobright-purple/20 hover:bg-purple-200">
              Simple 3-Step Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How JobRight Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes finding your perfect job match quick and easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-blue-50 p-4 rounded-full inline-flex justify-center items-center w-20 h-20 mb-6">
                <FileSearch className="text-jobright-blue h-8 w-8" />
              </div>
              <div className="absolute -mt-12 ml-16 flex justify-center items-center w-8 h-8 bg-jobright-blue text-white rounded-full font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload Your Resume</h3>
              <p className="text-gray-600">
                Upload your resume and our AI will analyze your skills, experience, and qualifications.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-50 p-4 rounded-full inline-flex justify-center items-center w-20 h-20 mb-6">
                <BarChart3 className="text-jobright-purple h-8 w-8" />
              </div>
              <div className="absolute -mt-12 ml-16 flex justify-center items-center w-8 h-8 bg-jobright-purple text-white rounded-full font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Matched to Jobs</h3>
              <p className="text-gray-600">
                Our AI matches you to jobs based on your skills, experience, and preferences with a match percentage.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-50 p-4 rounded-full inline-flex justify-center items-center w-20 h-20 mb-6">
                <CheckCircle className="text-green-600 h-8 w-8" />
              </div>
              <div className="absolute -mt-12 ml-16 flex justify-center items-center w-8 h-8 bg-green-600 text-white rounded-full font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Apply with Ease</h3>
              <p className="text-gray-600">
                Apply to jobs directly through our platform or schedule automated applications based on your preferences.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-jobright-blue">
              <Link to="/resume">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-jobright-blue border-jobright-blue/20 hover:bg-blue-200">
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose JobRight</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines AI technology with a user-friendly interface to make your job search efficient and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileSearch className="text-jobright-blue h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Resume Analysis</h3>
              <p className="text-gray-600">
                Our AI extracts skills and experience from your resume to find the best job matches.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="text-jobright-purple h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Match Percentage</h3>
              <p className="text-gray-600">
                See how well your skills and experience match each job with our percentage scoring system.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Briefcase className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">One-Click Apply</h3>
              <p className="text-gray-600">
                Apply to multiple jobs with a single click using your saved profile information.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-yellow-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Star className="text-yellow-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resume Improvement Tips</h3>
              <p className="text-gray-600">
                Get personalized suggestions to improve your resume and increase your match rate.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-red-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Building2 className="text-red-500 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Company Insights</h3>
              <p className="text-gray-600">
                Learn more about potential employers with detailed company profiles and reviews.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-indigo-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Filters</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our detailed search filters and preferences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-600 border-green-600/20 hover:bg-green-200">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of job seekers have found their perfect match with JobRight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "JobRight's AI matching was spot on! I uploaded my resume and within days found a job that perfectly matched my skills and career goals."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The resume improvement suggestions helped me highlight skills I didn't know were valuable. My match percentage increased by 30% after making the changes!"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Jessica Miller</h4>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The one-click apply feature saved me so much time in my job search. JobRight helped me find and apply to my dream job in less than a week!"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-jobright-blue to-jobright-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Job?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied job seekers who found their ideal career match with JobRight
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-jobright-blue hover:bg-gray-100">
              <Link to="/signup">Create Free Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/resume">Upload Your Resume</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">10k+</h3>
              <p>Jobs Available</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">85%</h3>
              <p>Successful Matches</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">50k+</h3>
              <p>Happy Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">2.5k+</h3>
              <p>Partner Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-jobright-blue border-jobright-blue/20 hover:bg-blue-200">
              Got Questions?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about JobRight
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">How does JobRight's AI matching work?</h3>
                <p className="text-gray-600">
                  Our AI analyzes your resume to extract skills, experience, and qualifications. It then compares these with job requirements to find the best matches, giving each job a match percentage score.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Is JobRight free to use?</h3>
                <p className="text-gray-600">
                  Yes! Basic features including resume upload, job matching, and applying to jobs are completely free. We offer premium features for advanced users.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">How accurate are the job matches?</h3>
                <p className="text-gray-600">
                  Our AI matching algorithm has an 85% accuracy rate based on user feedback. The more information you provide in your profile, the more accurate your matches will be.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Can I apply to jobs directly through JobRight?</h3>
                <p className="text-gray-600">
                  Yes, you can apply to most jobs with a single click directly through our platform. Some jobs may redirect you to the company's application page.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">What file formats are accepted for resume upload?</h3>
                <p className="text-gray-600">
                  We accept resumes in PDF, DOCX, and TXT formats. For best results, we recommend uploading a well-structured PDF or DOCX file.
                </p>
              </Card>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support <ChevronRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
