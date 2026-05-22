export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Vaani</h1>
        <p className="text-xl text-gray-600 mb-2">
          Vernacular Content Tool for Indian Creators
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Generate, translate, and schedule content in Kannada, Tamil, and Malayalam
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Caption Generation
              </h3>
              <p className="text-gray-600">
                Generate engaging captions in Kannada, Tamil, and Malayalam powered by Claude AI
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Translation
              </h3>
              <p className="text-gray-600">
                Translate content with cultural context - not machine-translated, but native-sounding
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Schedule Posts
              </h3>
              <p className="text-gray-600">
                Schedule your content to publish automatically on Instagram and Facebook
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-2 border-gray-200 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">₹0</p>
              <ul className="text-gray-600 mb-8 space-y-3">
                <li>✓ 10 captions/month</li>
                <li>✓ Kannada, Tamil, Malayalam</li>
                <li>✗ Scheduling</li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium">
                Current Plan
              </button>
            </div>
            <div className="border-2 border-blue-600 p-8 rounded-lg bg-blue-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">₹299<span className="text-lg">/mo</span></p>
              <ul className="text-gray-600 mb-8 space-y-3">
                <li>✓ 50 captions/month</li>
                <li>✓ All languages</li>
                <li>✓ Instagram scheduling</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
                Upgrade
              </button>
            </div>
            <div className="border-2 border-gray-200 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">₹999<span className="text-lg">/mo</span></p>
              <ul className="text-gray-600 mb-8 space-y-3">
                <li>✓ 500 captions/month</li>
                <li>✓ All languages</li>
                <li>✓ Multi-platform scheduling</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Vaani. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
