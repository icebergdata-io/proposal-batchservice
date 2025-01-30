import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Shield, ChevronRight, BarChart, 
  FileCheck, Briefcase, Scale, Settings,
  LineChart, Users, Clock, Building,
  X, MousePointer, Calendar, Server, Building2, Link
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAnalytics } from './hooks/useAnalytics'

const Logo = ({ type, className = "", white = false, onClick }) => {
  const logos = {
    iceberg: "/logo_iceberg_HORIZONTAL_trans_720.png",
    xertica: "/xertica.jpg"
  }

  const whiteModeLogos = {
    iceberg: "/logo_iceberg_HORIZONTAL_trans_720.png",
    xertica: "/xertica.jpg"
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
          Ver más
        </div>
      )}
    </div>
  )
}

function App() {
  const [selectedBenefit, setSelectedBenefit] = useState(null)
  const [showCompanyInfo, setShowCompanyInfo] = useState(false)
  const { trackButtonClick, trackPopupOpen, trackSectionView } = useAnalytics()

  const handleSchedule = () => {
    trackButtonClick('schedule_call')
    window.open('https://calendly.com/icedata/dm', '_blank')
  }

  const handleBenefitClick = (benefit) => {
    trackPopupOpen(`benefit_${benefit}`)
    setSelectedBenefit(benefit)
  }

  const handleCompanyInfoClick = () => {
    trackPopupOpen('company_info')
    setShowCompanyInfo(true)
  }

  // Track initial page view
  useEffect(() => {
    trackSectionView('page_view')
  }, [])

  // Track section views on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackSectionView(entry.target.dataset.section)
          }
        })
      },
      { threshold: 0.5 }
    )

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const benefitsDetails = {
    efficiency: {
      title: "Pipeline de Datos de Productos",
      points: [
        "Extracción automatizada de listados de productos de múltiples fuentes",
        "Scrapers personalizados para cada farmacia",
        "Deduplicación y fusión inteligente de datos",
        "Validación automática de calidad de datos",
        "Pipeline de procesamiento de imágenes y documentos",
        "Seguimiento y versionado de datos históricos"
      ]
    },
    compliance: {
      title: "Pipeline de Información de Precios",
      points: [
        "Agregación de información de precios de múltiples fuentes",
        "Sistema avanzado de verificación de disponibilidad",
        "Validación y verificación de precios",
        "Enriquecimiento con datos de promociones",
        "Automatización de búsqueda de ofertas",
        "Monitoreo de frescura de información",
        "Políticas de retención de datos conformes"
      ]
    },
    cost: {
      title: "Visualización y Análisis de Datos",
      points: [
        "Dashboards interactivos desarrollados por Xertica",
        "Visualizaciones personalizadas para análisis de tendencias",
        "Reportes automatizados de KPIs clave",
        "Análisis comparativo de precios y competencia",
        "Alertas y notificaciones configurables",
        "Exportación de datos en múltiples formatos",
        "Integración con herramientas de BI existentes"
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
          <h3 className="text-2xl font-bold text-primary">Sobre Iceberg Data</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Experiencia en Web Scraping</h4>
            <p className="text-gray-700">
              Iceberg Data se especializa en construir infraestructura de web scraping de nivel empresarial 
              y pipelines de recolección de datos. Nuestra experiencia radica en crear soluciones 
              escalables, confiables y conformes para la adquisición de datos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Capacidades Principales</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Desarrollo de pipelines de scraping personalizados para necesidades específicas de la industria</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Gestión y optimización avanzada de infraestructura de proxies</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Sistemas de aseguramiento y validación de calidad de datos</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Prácticas éticas y conformes de recolección de datos</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-2">Enfoque de Colaboración</h4>
            <p className="text-gray-700">
              Trabajamos estrechamente con clientes empresariales para entender sus necesidades 
              específicas de datos y desarrollar soluciones personalizadas que aprovechen 
              nuestra infraestructura de última generación.
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
          <Logo type="xertica" className="h-6 sm:h-8"/> 
        </div>
        <motion.button
          className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-full font-medium inline-flex items-center transition-colors duration-300 text-sm"
          onClick={handleSchedule}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Agendar una llamada
          <ChevronRight className="ml-1 w-4 h-4" />
        </motion.button>
      </div>

      <motion.div 
        className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden pt-16 sm:pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative h-[500px] sm:h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
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
                Propuesta de Infraestructura para Recopilación de Datos
              </p>
              <a 
                href="https://www.icebergdata.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/90 text-sm sm:text-base font-medium mb-2 hover:text-white transition-colors inline-block"
              >
                www.icebergdata.co
              </a>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-8 leading-tight">
                Inteligencia de mercado<br />
                para el sector farmacéutico
              </h1>
              <p className="text-lg sm:text-2xl font-light mb-8 sm:mb-10">
                Monitoreo constante de precios,<br />
                inventarios y tendencias de 160+ farmacias
              </p>
              <motion.button
                className="bg-white text-primary hover:bg-primary-dark hover:text-white px-8 py-4 rounded-full font-medium inline-flex items-center transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={handleSchedule}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Agendar una llamada
                <ChevronRight className="ml-3 w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <motion.section {...fadeIn} className="mb-12 sm:mb-16" data-section="partnership_overview">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">Descripción general de la alianza</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="flex-1 w-full">
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                A medida que Farmatic busca expandir su presencia en el mercado farmacéutico de LATAM, 
                una infraestructura automatizada de datos se vuelve crucial. Nuestra solución no solo 
                recopila datos de múltiples fuentes, sino que los procesa y visualiza automáticamente - 
                permitiéndole tomar decisiones informadas basadas en dashboards actualizados periódicamente 
                con precios, inventarios, promociones y tendencias del mercado.{' '}
                <button 
                  onClick={() => setShowCompanyInfo(true)}
                  className="ml-1 text-primary hover:text-primary-dark font-medium underline decoration-dotted underline-offset-4 transition-colors"
                >
                  Sobre Iceberg Data
                </button>
              </p>

              <div className="bg-blue-50 border border-primary/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-primary">Capacidades de Web Scraping</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-primary mb-2">Sistema Anti-Detección</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Fingerprinting avanzado</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Rotación de proxies</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Patrones de solicitud aleatorios</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-primary mb-2">Calidad de Datos</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Validación de datos en tiempo real</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Detección automática de errores</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Formateo estructurado de datos</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-primary mb-2">Rendimiento</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Scraping concurrente</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                        <span className="text-gray-600">Optimización de recursos</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-primary/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center mb-4">
                  <Server className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-primary">Beneficios para el Negocio</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Transforme sus datos en ventajas competitivas:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Análisis de competencia:</b> Compare precios y promociones para ajustar estrategias y mantener competitividad</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Gestión de inventarios:</b> Monitoree el stock para optimizar niveles y evitar pérdidas</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Identificación de tendencias:</b> Detecte patrones en la demanda para anticipar necesidades</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Optimización de promociones:</b> Evalúe y mejore la efectividad de sus ofertas con datos reales</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Mejora de experiencia:</b> Ofrezca recomendaciones personalizadas basadas en datos</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Decisiones informadas:</b> Equipe a sus equipos con datos actualizados para estrategias efectivas</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span><b>Automatización de reportes:</b> Genere visualizaciones y KPIs automáticos para seguimiento</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-oxylabs/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center mb-4">
                  <Building2 className="w-6 h-6 text-oxylabs mr-3" />
                  <h3 className="text-lg font-semibold text-oxylabs">Recopilación de Datos de Farmacias</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  A través de nuestro proceso avanzado de web scraping y recopilación de datos, puede obtener información completa de productos farmacéuticos de las principales cadenas, incluyendo:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-oxylabs mb-2">Datos Disponibles</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Precios históricos de múltiples fuentes</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Disponibilidad de inventario</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Análisis de precios competitivos</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Tendencias de promociones y descuentos</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-oxylabs mb-2">Cobertura</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Farmatodo</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Cruz Verde</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">La Rebaja</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-oxylabs mr-2 mt-1" />
                        <span className="text-gray-600">Otras cadenas principales</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <Link className="w-6 h-6 text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Algunas fuentes de datos para el scraping</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/farmatodo1.png" alt="Farmatodo" className="h-8 object-contain" />
                  </div>
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/larebaja1.jpg" alt="La Rebaja" className="h-11 object-contain" />
                  </div>
                  <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/cruzverde1.png" alt="Cruz Verde" className="h-8 object-contain" />
                  </div>
                  {/* <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <img src="/logos/other_pharmacies.png" alt="Otras Farmacias" className="h-8 object-contain" />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-64 flex flex-col items-center space-y-6">
              <Logo 
                type="iceberg" 
                className="h-20 sm:h-40 w-auto" 
                onClick={() => setShowCompanyInfo(true)}
              />
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16 relative" data-section="pipeline_benefits">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Beneficios del Pipeline de Scraping</h2>
          
          <div className="absolute top-0 right-0 flex items-center text-primary">
            <MousePointer className="w-4 h-4 mr-2" />
            <span className="text-xs sm:text-sm">Click para ver detalles</span>
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
              <h3 className="text-xl font-semibold mb-3">Pipeline de Datos de Productos</h3>
              <p className="text-gray-600">
                Sistema integral de recopilación de datos de productos que mejora las 
                capacidades de inteligencia de mercado de Farmatic.
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
              <h3 className="text-xl font-semibold mb-3">Pipeline de Información de Precios</h3>
              <p className="text-gray-600">
                Sistema avanzado de descubrimiento y verificación de precios para 
                potenciar los servicios de análisis competitivo de Farmatic.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card cursor-pointer relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedBenefit('cost')}
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 rounded-xl transition-opacity" />
              <BarChart className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Visualización y Análisis de Datos</h3>
              <p className="text-gray-600">
                Dashboards interactivos y reportes automatizados desarrollados por Xertica 
                para transformar datos crudos en insights accionables.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16" data-section="development_approach">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Enfoque de Desarrollo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FileCheck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Metodología Ágil</h3>
              <p className="text-gray-600">
                Ciclos de sprint de dos semanas con demostraciones regulares y sesiones de 
                retroalimentación, asegurando que el desarrollo se alinee con sus objetivos comerciales.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Desarrollo Colaborativo</h3>
              <p className="text-gray-600">
                Colaboración estrecha con su equipo a través de reuniones diarias y 
                revisiones regulares de código para mantener altos estándares de calidad.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16" data-section="key_deliverables">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Entregables Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Servicios Continuos</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mantenimiento semanal de infraestructura y optimización de rendimiento</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Canal dedicado de Slack para comunicación y soporte en tiempo real</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Análisis ad-hoc y solicitudes personalizadas de extracción de datos</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Informes de rendimiento y recomendaciones de optimización</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Capacidades de Recolección de Datos</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Extracción de datos a nivel de producto (detalles, imágenes, historial, valoración)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Recopilación de información de precios (precios actuales, históricos y promociones)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Recolección de datos de inventario (disponibilidad, stock, ubicaciones)</span>
                </li>
                {/* <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Extracción de análisis de mercado (tendencias, comparativas, demografía)</span>
                </li> */}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Cobertura de Sitios Web</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Exploración continua de sitios web e identificación de nuevas fuentes</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Detección automatizada de cambios en la estructura de los sitios</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Soluciones de scraping personalizadas para fuentes específicas</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Actualizaciones regulares de patrones de extracción y selectores</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Infraestructura Técnica</h3>
              <ul className="space-y-3">
                {/* <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Sincronización de datos en tiempo real con APIs</span>
                </li> */}
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Infraestructura de scraping escalable con failover automático</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Sistemas de monitoreo y alertas automatizados</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pipelines de aseguramiento y validación de calidad de datos</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Sistemas integrales de registro y seguimiento de errores</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16" data-section="development_timeline">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Plan de Implementación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fase de Configuración (Meses 1-16)</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><b>Implementación Mensual:</b> Configuración de 10 nuevos dominios</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><b>Alcance Total:</b> 160 dominios configurados al finalizar el mes 16</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><b>Actividades:</b> Configuración de scrapers, pruebas y validación de datos</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Database className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fase de Mantenimiento</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><b>Ejecución:</b> Scraping semanal de datos para dominios activos</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><b>Soporte:</b> Mantenimiento continuo y actualizaciones de scrapers</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><b>Monitoreo:</b> Supervisión constante de calidad y precisión de datos</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-8 bg-blue-50 border border-primary/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Estructura de Implementación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-primary mb-2">Durante Meses 1-16</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                    <span className="text-gray-600">Configuración mensual de 10 nuevos dominios</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                    <span className="text-gray-600">Inicio inmediato de scraping semanal para dominios configurados</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                    <span className="text-gray-600">Facturación trimestral de mantenimiento según dominios activos</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Después del Mes 16</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                    <span className="text-gray-600">160 dominios en operación completa</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                    <span className="text-gray-600">Mantenimiento y soporte continuo de todos los scrapers</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1" />
                    <span className="text-gray-600">Facturación trimestral regular de mantenimiento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold text-primary">Plan Alternativo Disponible</h3>
              </div>
              
              <div className="bg-white rounded-lg p-5">
                <h4 className="text-xl font-semibold text-primary mb-3">Plan de 10 Colectores</h4>
                <p className="text-gray-700 mb-4">
                  Solución optimizada para empresas que requieren un alcance más específico. Este plan incluye:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <b>Configuración Inicial:</b> Implementación y configuración de 10 colectores específicos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <b>Duración:</b> Mantenimiento y soporte garantizado por un año completo
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <b>Beneficios:</b> Acceso a todas las funcionalidades de recolección y visualización de datos
                    </span>
                  </li>
                </ul>
                <div className="mt-6 flex justify-end">
                  <motion.button
                    className="bg-primary text-white px-6 py-2 rounded-full font-medium inline-flex items-center hover:bg-primary-dark transition-colors duration-300"
                    onClick={handleSchedule}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Consultar detalles
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} className="mb-12 sm:mb-16" data-section="infrastructure_security">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">Infraestructura y Seguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <Logo type="iceberg" className="h-6 mr-3" />
                <h3 className="text-xl font-semibold">Infraestructura Empresarial</h3>
              </div>
              <p className="text-gray-600">
                Infraestructura de clase mundial para una confiabilidad, velocidad y 
                escalabilidad incomparables en operaciones de recolección y procesamiento de datos.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Seguridad y Conformidad</h3>
              </div>
              <p className="text-gray-600">
                Medidas de seguridad y estándares de conformidad líderes en la industria, 
                respaldados por nuestra trayectoria comprobada en protección de datos empresariales.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          {...fadeIn}
          className="text-center py-12 bg-gray-100 rounded-xl"
        >
          <div className="flex justify-center items-center mb-8">
            <Logo 
              type="iceberg" 
              className="h-16" 
              onClick={() => setShowCompanyInfo(true)}
            />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-4">¿Listo para mejorar el ecosistema de datos de Farmatic?</h3>
          <p className="text-lg text-gray-700 mb-8">
            Hablemos sobre cómo podemos llevar su análisis de mercado al siguiente nivel.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <motion.button
              className="primary-button inline-flex items-center"
              onClick={handleSchedule}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar una llamada
              <ChevronRight className="ml-2 w-5 h-5" />
            </motion.button>
            <p className="text-sm text-gray-500">
              Una solución de Iceberg Data
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
        </AnimatePresence>
      </main>

      <footer className="text-center py-6 sm:py-8 text-gray-600">
      <div className="flex justify-center items-center space-x-6 sm:space-x-8 mb-3 sm:mb-4">
          <Logo 
            type="iceberg" 
            className="h-10 sm:h-12" 
            onClick={() => setShowCompanyInfo(true)}
          />
        <Logo type="xertica" className="h-5 sm:h-6" />
        </div>
        <p className="text-sm sm:text-base">© {new Date().getFullYear()} Iceberg Data & Xertica</p>
      </footer>
    </div>
  )
}

export default App 