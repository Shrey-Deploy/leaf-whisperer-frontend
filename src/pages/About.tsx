
import { Leaf, Sun, Cloud, Sprout } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const About = () => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-plant-background">
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </section>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Leaf,
                titleKey: 'about.features.detection.title',
                descriptionKey: 'about.features.detection.description'
              },
              {
                icon: Sun,
                titleKey: 'about.features.treatment.title',
                descriptionKey: 'about.features.treatment.description'
              },
              {
                icon: Cloud,
                titleKey: 'about.features.weather.title',
                descriptionKey: 'about.features.weather.description'
              },
              {
                icon: Sprout,
                titleKey: 'about.features.crops.title',
                descriptionKey: 'about.features.crops.description'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <feature.icon className="h-12 w-12 text-plant-green mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-gray-600">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">{t('about.howItWorks.title')}</h2>
            <div className="space-y-6">
              {t('about.howItWorks.steps').split(',').map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-plant-green text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

