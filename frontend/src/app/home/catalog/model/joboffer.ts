export interface JobOffer {
    id?: number;
    title: string;
    description?: string;
    company?: { companyName: string };
    category?: { name: string };
    state?: { name: string };
    publishedAt?: string;
    contract?: { name: string };
}
