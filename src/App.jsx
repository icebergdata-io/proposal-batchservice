import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Shield, ChevronRight, BarChart, 
  FileCheck, Briefcase, Scale, Settings,
  LineChart, Users, Clock, Building,
  X, MousePointer, Calendar, Server, Building2, Link
} from 'lucide-react'
import { useState } from 'react'

const Logo = ({ type, className = "", white = false, onClick }) => {
  const logos = {
    iceberg: "/logo_iceberg_RECTANGULAR_trans_720.png",
    oxylabs: "/oxylabs-logo.png"
  }

  const whiteModeLogos = {
    iceberg: "/logo_iceberg_RECTANGULAR_trans_720.png",
    oxylabs: "/oxylabs-logo.png"
  }

  return (
    <div className={`relative group ${type === 'iceberg' ? 'cursor-pointer' : ''}`}>
      <img 
        src={white ? whiteModeLogos[type] : logos[type]} 
        alt={`${type} logo`} 
        className={`object-contain ${white && type === 'iceberg' ? 'brightness-0 invert' : ''} ${className} ${
          type === 'iceberg' ? 'transition-transform duration-300 hover:scale-105' : ''
        }`}
        onClick={() => type === 'iceberg' && onClick?.()}
      />
      {type === 'iceberg' && (
        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click for info
        </div>
      )}
    </div>
  )
}

function App() {
  const [selectedBenefit, setSelectedBenefit] = useState(null)
  const [showCompanyInfo, setShowCompanyInfo] = useState(false)
  const [showOxylabsInfo, setShowOxylabsInfo] = useState(false)

  const handleSchedule = () => {
    window.open('https://calendly.com/icedata/dm', '_blank')
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const benefitsDetails = {
    efficiency: {
      title: "Property Data Collection Pipeline",
      points: [
        "Automated property listing extraction across multiple sources",
        "Real-time MLS data synchronization capabilities",
        "Custom scrapers for county records and tax assessor data",
        "Intelligent data deduplication and merging",
        "Automated data quality validation and enrichment",
        "Property image and document processing pipeline",
        "Historical property data tracking and versioning"
      ]
    },
    compliance: {
      title: "Contact & Owner Information Pipeline",
      points: [
        "Multi-source contact information aggregation",
        "Advanced phone number verification system",
        "Email validation and verification workflow",
        "Social media profile enrichment capabilities",
        "Business entity and LLC lookup automation",
        "Contact information freshness monitoring",
        "Compliance-focused data retention policies"
      ]
    },
    cost: {
      title: "Skip Tracing Enhancement Pipeline",
      points: [
        "Multi-threaded contact discovery system",
        "Advanced pattern matching for owner identification",
        "Automated public records aggregation",
        "Cross-reference validation with multiple sources",
        "Machine learning-based contact scoring",
        "Automated chain of title analysis",
        "Real-time contact verification system"
      ]
    }
  }

  const Popup = ({ benefit, onClose }) => (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl p-4 sm:p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-primary mb-4">{benefitsDetails[benefit].title}</h3>
        <ul className="space-y-3">
          {benefitsDetails[benefit].points.map((point, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )

  const CompanyPopup = ({ onClose }) => (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl p-4 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center mb-6">
          <Logo type="iceberg" className="h-16 mr-4" />
          <h3 className="text-2xl font-bold text-primary">About Iceberg Data</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Web Scraping Expertise</h4>
            <p className="text-gray-700">
              Iceberg Data specializes in building enterprise-grade web scraping infrastructure 
              and data collection pipelines. Our expertise lies in creating scalable, reliable, 
              and compliant data acquisition solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Core Capabilities</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Custom scraping pipeline development for specific industry needs</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Advanced proxy infrastructure management and optimization</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Data quality assurance and validation systems</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Compliance and ethical data collection practices</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Partnership Approach</h4>
            <p className="text-gray-700">
              We work closely with enterprise clients to understand their specific data needs 
              and develop custom solutions that leverage the best-in-class infrastructure 
              provided by our strategic partnership with Oxylabs.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  const OxylabsPopup = ({ onClose }) => (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl p-4 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center mb-6">
          <Logo type="oxylabs" className="h-8 mr-4" />
          <h3 className="text-2xl font-bold text-oxylabs">About Oxylabs</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-oxylabs mb-2">Enterprise Proxy Infrastructure</h4>
            <p className="text-gray-700">
              Oxylabs is a leading provider of premium proxies and web scraping solutions. 
              Their enterprise-grade infrastructure powers data-driven businesses worldwide 
              with reliable, scalable, and ethically-sourced proxy services.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-oxylabs mb-2">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-oxylabs mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">100M+ residential proxies with global coverage</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-oxylabs mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">99.9% uptime with enterprise-grade reliability</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-oxylabs mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Advanced targeting and rotation capabilities</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-oxylabs mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">24/7 dedicated enterprise support</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-oxylabs mb-2">Enterprise Solutions</h4>
            <p className="text-gray-700">
              Oxylabs provides tailored solutions for large-scale data gathering operations, 
              ensuring high success rates, ethical data collection, and enterprise-grade security 
              protocols for businesses of all sizes.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-white py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center shadow-sm z-50">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Logo 
            type="iceberg" 
            className="h-12 sm:h-16" 
            onClick={() => setShowCompanyInfo(true)}
          />
          <span className="text-gray-300 text-xl sm:text-2xl">×</span>
          <Logo type="oxylabs" className="h-6 sm:h-8" />
        </div>
        <motion.button
          className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-full font-medium inline-flex items-center transition-colors duration-300 text-sm"
          onClick={handleSchedule}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Call
          <ChevronRight className="ml-1 w-4 h-4" />
        </motion.button>
      </div>

      <motion.div 
        className="bg-primary text-white relative overflow-hidden pt-16 sm:pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative h-[500px] sm:h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/city-buildings-with-digital-data-4k-2023-11-27-04-55-36-utc.mp4" type="video/mp4" />
          </video>
          
          <div className="relative z-20 h-full flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl mx-auto text-center px-4"
            >
              <p className="text-white/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Enterprise Infrastructure Proposal
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-8 leading-tight">
                Building the Next Generation of<br />
                Real Estate Data Collection
              </h1>
              <p className="text-lg sm:text-2xl font-light mb-8 sm:mb-10">
                Advanced Web Scraping Architecture for<br />
                BatchService's Data Ecosystem
              </p>
              <motion.button
                className="bg-white text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-medium inline-flex items-center transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={handleSchedule}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule a Discovery Call
                <ChevronRight className="ml-3 w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <motion.section {...fadeIn} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">Partnership Overview</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="flex-1 w-full">
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                As BatchService continues to lead the real estate data industry with platforms like BatchLeads and BatchData, 
                reliable web scraping infrastructure becomes crucial for maintaining your extensive property and contact database. 
                By leveraging{' '}
                <button 
                  onClick={() => setShowOxylabsInfo(true)}
                  className="text-oxylabs hover:text-oxylabs-dark font-medium underline decoration-dotted underline-offset-4 transition-colors"
                >
                  Oxylabs'
                </button>{' '}
                enterprise-grade proxy network, we can enhance your data collection capabilities across multiple sources - 
                from property listings and tax assessor records to contact information and ownership details - ensuring 
                your 10,000+ real estate professionals always have access to the most accurate and up-to-date data.{' '}
                <button 
                  onClick={() => setShowCompanyInfo(true)}
                  className="ml-1 text-primary hover:text-primary-dark font-medium underline decoration-dotted underline-offset-4 transition-colors"
                >
                  About Iceberg Data
                </button>
              </p>

              <div className="bg-blue-50 border border-primary/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-primary">Data Scraping Capabilities</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-primary mb-2">Anti-Detection System</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Advanced browser fingerprinting</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Proxy rotation strategies</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Request pattern randomization</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-primary mb-2">Data Quality</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Real-time data validation</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Automated error recovery</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Structured data formatting</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-primary mb-2">Performance</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Concurrent scraping</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Smart rate limiting</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Resource optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-primary/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center mb-4">
                  <Server className="w-6 h-6 text-oxylabs mr-3" />
                  <h3 className="text-lg font-semibold text-oxylabs">Infrastructure Benefits</h3>
                </div>
                <p className="text-gray-700">
                  Enhance BatchData's core capabilities with:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <ChevronRight className="w-4 h-4 text-oxylabs mr-2" />
                    Reliable data collection for property intelligence
                  </li>
                  <li className="flex items-center text-gray-700">
                    <ChevronRight className="w-4 h-4 text-oxylabs mr-2" />
                    Scalable infrastructure for contact enrichment
                  </li>
                  <li className="flex items-center text-gray-700">
                    <ChevronRight className="w-4 h-4 text-oxylabs mr-2" />
                    Enhanced skip tracing capabilities
                  </li>
                  <li className="flex items-center text-gray-700">
                    <ChevronRight className="w-4 h-4 text-oxylabs mr-2" />
                    Improved property search accuracy
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-oxylabs/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center mb-4">
                  <Building2 className="w-6 h-6 text-oxylabs mr-3" />
                  <h3 className="text-lg font-semibold text-oxylabs">Rent Estimate Data Collection</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Through our advanced web scraping and data collection process, you can calculate comprehensive rent estimates from leading real estate platforms, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-oxylabs mb-2">Data Points Available After 3 months of Collection</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Historical rent trends from multiple sources</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Comparable property rents in target areas</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Market rate analysis with competitive insights</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Seasonal pricing factors and trends</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-oxylabs mb-2">Coverage</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Zillow Rent Zestimates</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Realtor.com estimates</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Apartments.com listings</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Local MLS data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <Link className="w-6 h-6 text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Scraping Data Sources</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/zillologo.jpeg" alt="Zillow" className="h-8 object-contain" />
                  </div>
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/realtorlogo.png" alt="Realtor.com" className="h-8 object-contain" />
                  </div>
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/apartmentslogo.png" alt="Apartments.com" className="h-6 object-contain" />
                  </div>
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/mls_logo.png" alt="MLS" className="h-8 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-64 flex flex-col items-center space-y-6">
              <Logo 
                type="iceberg" 
                className="h-16 sm:h-20 w-auto" 
                onClick={() => setShowCompanyInfo(true)}
              />
              <div className="w-full flex items-center justify-center">
                <div className="w-12 sm:w-16 h-px bg-gray-300"></div>
                <span className="mx-3 sm:mx-4 text-gray-400">+</span>
                <div className="w-12 sm:w-16 h-px bg-gray-300"></div>
              </div>
              <Logo type="oxylabs" className="h-10 sm:h-12 w-auto" />
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16 relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Scraping Pipeline Benefits</h2>
          
          <div className="absolute top-0 right-0 flex items-center text-primary">
            <MousePointer className="w-4 h-4 mr-2" />
            <span className="text-xs sm:text-sm">Click cards for details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card cursor-pointer relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedBenefit('efficiency')}
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 rounded-xl transition-opacity" />
              <Database className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Property Data Pipeline</h3>
              <p className="text-gray-600">
                Comprehensive property data collection system leveraging Oxylabs' infrastructure 
                to enhance BatchData's property intelligence capabilities.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card cursor-pointer relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedBenefit('compliance')}
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 rounded-xl transition-opacity" />
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Contact Information Pipeline</h3>
              <p className="text-gray-600">
                Advanced contact discovery and verification system to power 
                BatchData's contact enrichment services.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card cursor-pointer relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedBenefit('cost')}
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 rounded-xl transition-opacity" />
              <FileCheck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Skip Tracing Pipeline</h3>
              <p className="text-gray-600">
                Enhanced skip tracing capabilities with multi-source validation 
                to improve BatchData's right-party contact rates.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Development Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FileCheck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Agile Methodology</h3>
              <p className="text-gray-600">
                Two-week sprint cycles with regular demos and feedback sessions, 
                ensuring the development aligns with your business objectives.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaborative Development</h3>
              <p className="text-gray-600">
                Close collaboration with your team through daily standups and 
                regular code reviews to maintain high quality standards.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Key Deliverables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Ongoing Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly infrastructure maintenance and performance optimization</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated Slack channel for real-time communication and support</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ad-hoc analysis and custom data extraction requests</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Monthly performance reports and optimization recommendations</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Data Collection Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Property-level data extraction (details, images, history, valuation)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Owner information gathering (contact details, portfolio analysis)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Broker and agent data collection (listings, performance metrics)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Market analytics extraction (trends, comparables, demographics)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Website Coverage</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Continuous website exploration and new source identification</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Automated detection of website structure changes</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom scraping solutions for specific data sources</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Regular updates to extraction patterns and selectors</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Technical Infrastructure</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Real-time data synchronization with BatchLeads and BatchData APIs</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Scalable scraping infrastructure with automatic failover</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Real-time monitoring and alert systems</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Data quality assurance and validation pipelines</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Comprehensive logging and error tracking systems</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Development Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Phase 1: Foundation</h3>
              <p className="text-gray-600">
                4 weeks - Architecture setup, core features implementation, and basic UI components.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Database className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Phase 2: BatchData Integration</h3>
              <p className="text-gray-600">
                8 weeks - Core integration with BatchData API, custom scraping pipeline setup, and data enrichment implementation.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BarChart className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Phase 3: Refinement</h3>
              <p className="text-gray-600">
                4 weeks - Performance optimization, security hardening, and deployment.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Infrastructure & Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <Logo type="oxylabs" className="h-6 mr-3" />
                <h3 className="text-xl font-semibold">Enterprise Infrastructure</h3>
              </div>
              <p className="text-gray-600">
                Leveraging Oxylabs' world-class infrastructure for unmatched reliability, 
                speed, and scalability in data collection and processing operations.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Security & Compliance</h3>
              </div>
              <p className="text-gray-600">
                Industry-leading security measures and compliance standards, 
                backed by Oxylabs' proven track record in enterprise data protection.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          {...fadeIn}
          className="text-center py-12 bg-gray-100 rounded-xl"
        >
          <div className="flex justify-center items-center mb-8 space-x-12">
            <Logo 
              type="iceberg" 
              className="h-16" 
              onClick={() => setShowCompanyInfo(true)}
            />
            <Logo type="oxylabs" className="h-8" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to Enhance BatchService's Data Ecosystem?</h3>
          <p className="text-lg text-gray-700 mb-8">
            Let's discuss how this partnership can elevate your web application to new heights.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <motion.button
              className="primary-button inline-flex items-center"
              onClick={handleSchedule}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Discovery Call
              <ChevronRight className="ml-2 w-5 h-5" />
            </motion.button>
            <p className="text-sm text-gray-500">
              A joint initiative by Iceberg Data & Oxylabs
            </p>
          </div>
        </motion.section>

        <AnimatePresence>
          {selectedBenefit && (
            <Popup 
              benefit={selectedBenefit} 
              onClose={() => setSelectedBenefit(null)} 
            />
          )}
          {showCompanyInfo && (
            <CompanyPopup 
              onClose={() => setShowCompanyInfo(false)} 
            />
          )}
          {showOxylabsInfo && (
            <OxylabsPopup 
              onClose={() => setShowOxylabsInfo(false)} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-6 sm:py-8 text-gray-600">
        <div className="flex justify-center items-center space-x-6 sm:space-x-8 mb-3 sm:mb-4">
          <Logo 
            type="iceberg" 
            className="h-10 sm:h-12" 
            onClick={() => setShowCompanyInfo(true)}
          />
          <Logo type="oxylabs" className="h-5 sm:h-6" />
        </div>
        <p className="text-sm sm:text-base">© {new Date().getFullYear()} Iceberg Data & Oxylabs Partnership</p>
      </footer>
    </div>
  )
}

export default App 