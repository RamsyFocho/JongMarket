export default function OrganizationSchema() {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jong Market",
      url: "https://jongmarket.com",
      logo: "https://jongmarket.com/images/logo.png",
      sameAs: ["https://facebook.com/jongmarket", "https://twitter.com/jongmarket", "https://instagram.com/jongmarket"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+237 677 889 900",
        contactType: "customer service",
        availableLanguage: ["English", "French"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Drink Avenue",
        addressLocality: "Yaoundé",
        addressRegion: "Centre",
        postalCode: "00237",
        addressCountry: "CM",
      },
    }
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    )
  }
  