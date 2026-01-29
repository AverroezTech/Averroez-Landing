import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://averroez.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: {
                    en: baseUrl,
                    ar: `${baseUrl}/ar`,
                },
            },
        },
    ];
}
