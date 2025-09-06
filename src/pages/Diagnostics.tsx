import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  Pill 
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { DiagnosticResult, BodySystem } from '../types';

const Diagnostics: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  
  // Mock function to simulate AI diagnostic analysis
  const analyzeDiagnostics = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock diagnostic result
    const mockResult: DiagnosticResult = {
      possibleDiagnosis: 'Common Cold',
      reasons: [
        'Viral infection of the upper respiratory tract',
        'Caused by rhinovirus or coronavirus',
        'Spread through airborne droplets or direct contact'
      ],
      precautions: [
        'Rest and stay hydrated',
        'Wash hands frequently',
        'Avoid close contact with others',
        'Cover mouth and nose when coughing or sneezing'
      ],
      remedies: [
        'Over-the-counter pain relievers for fever and discomfort',
        'Decongestants for nasal symptoms',
        'Cough suppressants for persistent cough',
        'Warm liquids and salt water gargles for sore throat'
      ],
      bodySystem: 'Respiratory',
      severity: 'low'
    };
    
    setDiagnosticResult(mockResult);
    setIsAnalyzing(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      analyzeDiagnostics();
    }
  };
  
  // Get color based on body system
  const getBodySystemColor = (system: BodySystem): string => {
    const colors: Record<string, string> = {
      'Cardiovascular': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Respiratory': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Digestive': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Nervous': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Muscular': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Skeletal': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      'Integumentary': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'Endocrine': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Lymphatic': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
      'Urinary': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      'Reproductive': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    };
    
    return colors[system] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">AI Diagnostics</h1>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <div className="bg-white/20 p-4 rounded-full">
                <Stethoscope className="h-12 w-12" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">AI-Powered Health Insights</h2>
              <p className="text-blue-100">
                Enter your symptoms below and our AI system will provide potential diagnoses, precautions, and suggested remedies. Please note that this is not a replacement for professional medical advice.
              </p>
            </div>
          </div>
        </div>
        
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="p-4">
            <label htmlFor="symptoms" className="block text-lg font-medium text-gray-800 dark:text-white mb-2">
              Describe your symptoms
            </label>
            <div className="mb-4">
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="For example: I have a fever, sore throat, and a cough for the last 3 days..."
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="primary"
                type="submit"
                disabled={isAnalyzing || !symptoms.trim()}
                icon={isAnalyzing ? undefined : <Search size={16} />}
                className="relative"
              >
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Symptoms...
                  </div>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>
            </div>
          </form>
        </Card>
        
        {diagnosticResult && (
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Diagnostic Results</h2>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getBodySystemColor(diagnosticResult.bodySystem)}`}>
                {diagnosticResult.bodySystem} System
              </span>
            </div>
            
            <Card className="border-l-4 border-blue-500">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Stethoscope className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Possible Diagnosis</h3>
                </div>
                <p className="text-lg text-gray-800 dark:text-gray-200">{diagnosticResult.possibleDiagnosis}</p>
              </div>
            </Card>
            
            <Card className="border-l-4 border-indigo-500">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Reasons/Causes</h3>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {diagnosticResult.reasons.map((reason, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{reason}</li>
                  ))}
                </ul>
              </div>
            </Card>
            
            <Card className="border-l-4 border-yellow-500">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Precautions</h3>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {diagnosticResult.precautions.map((precaution, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{precaution}</li>
                  ))}
                </ul>
              </div>
            </Card>
            
            <Card className="border-l-4 border-green-500">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Pill className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Suggested Remedies</h3>
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {diagnosticResult.remedies.map((remedy, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{remedy}</li>
                  ))}
                </ul>
              </div>
            </Card>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-md">
              <div className="flex">
                <ShieldCheck className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">Medical Disclaimer</p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    This is an AI-generated preliminary assessment and should not replace professional medical advice. If you're experiencing severe symptoms or are concerned, please consult a healthcare professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!diagnosticResult && !isAnalyzing && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
            <Stethoscope className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your symptoms to get started
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Our AI will analyze your symptoms and provide potential health insights. Remember, this tool is for informational purposes only and does not replace professional medical advice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnostics;