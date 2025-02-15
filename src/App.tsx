import React, { useState } from 'react';
import { Settings, Target, TrendingUp, DollarSign, BarChart2, AlertCircle, Globe, Instagram, Users, ShoppingBag, Eye } from 'lucide-react';

type CampaignData = {
  niche: string;
  targetAge: string;
  targetGender: string;
  location: string;
  objective: string;
  budget: string;
  keywords?: string;
  competitors?: string;
  // Novos campos
  companyName: string;
  websiteUrl?: string;
  instagramHandle: string;
  monthlyRevenue?: string;
  currentCustomers?: string;
  productPriceRange: string;
  mainProducts: string;
};

type SocialMediaMetrics = {
  followers: number;
  engagement: number;
  postsPerWeek: number;
  avgLikes: number;
  topHashtags: string[];
  audienceGrowth: string;
  bestPerformingContent: string[];
};

type WebsiteMetrics = {
  monthlyVisitors: number;
  bounceRate: string;
  avgSessionDuration: string;
  topPages: string[];
  conversionRate: string;
  deviceDistribution: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
};

type CompetitorAnalysis = {
  name: string;
  marketShare: string;
  strengths: string[];
  weaknesses: string[];
  priceComparison: string;
};

type Analysis = {
  marketSize: string;
  suggestedBid: string;
  potentialReach: string;
  competitionLevel: string;
  recommendedKeywords: string[];
  estimatedResults: {
    clicks: number;
    impressions: number;
    ctr: number;
    averageCPC: number;
    estimatedConversions: number;
    estimatedROI: string;
  };
  socialMedia: SocialMediaMetrics;
  website?: WebsiteMetrics;
  competitors: CompetitorAnalysis[];
  marketOpportunities: string[];
  recommendedStrategy: {
    adTypes: string[];
    budget: {
      distribution: {
        search: number;
        display: number;
        remarketing: number;
      };
      dailyBudget: number;
    };
    targeting: {
      demographics: string[];
      interests: string[];
      behaviors: string[];
    };
  };
};

function App() {
  const [campaignData, setCampaignData] = useState<CampaignData>({
    niche: '',
    targetAge: '',
    targetGender: '',
    location: '',
    objective: '',
    budget: '',
    keywords: '',
    competitors: '',
    companyName: '',
    websiteUrl: '',
    instagramHandle: '',
    monthlyRevenue: '',
    currentCustomers: '',
    productPriceRange: '',
    mainProducts: '',
  });

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const analyzeData = (data: CampaignData): Analysis => {
    const budget = parseFloat(data.budget.replace(/[^0-9.-]+/g, ''));
    const monthlyRevenue = data.monthlyRevenue ? parseFloat(data.monthlyRevenue.replace(/[^0-9.-]+/g, '')) : 0;
    const currentCustomers = data.currentCustomers ? parseInt(data.currentCustomers, 10) : 0;
    
    // Análise de mercado baseada no nicho e localização
    const marketSizeAnalysis = {
      moda: 'Grande (> 1M buscas/mês)',
      tecnologia: 'Muito Grande (> 2M buscas/mês)',
      saude: 'Grande (> 1.5M buscas/mês)',
      default: 'Médio (500k-1M buscas/mês)'
    };

    // Cálculo de métricas de negócio
    const averageOrderValue = monthlyRevenue / currentCustomers || 0;
    const customerLifetimeValue = averageOrderValue * 2.5; // Estimativa conservadora
    const suggestedBid = (customerLifetimeValue * 0.1).toFixed(2);
    const estimatedClicks = Math.floor(budget / parseFloat(suggestedBid));

    // Análise de redes sociais simulada (em um caso real, usaríamos a API do Instagram)
    const socialMediaMetrics: SocialMediaMetrics = {
      followers: 5000,
      engagement: 3.2,
      postsPerWeek: 5,
      avgLikes: 250,
      topHashtags: [
        `#${data.niche}`,
        `#${data.niche}${data.location}`,
        `#${data.mainProducts.split(',')[0]}`,
        `#tendencias${data.niche}`,
        `#${data.niche}brasil`
      ],
      audienceGrowth: '15% ao mês',
      bestPerformingContent: [
        'Posts de produtos em uso',
        'Conteúdo educativo sobre o nicho',
        'Behind the scenes'
      ]
    };

    // Análise de competidores
    const competitors: CompetitorAnalysis[] = [
      {
        name: 'Competidor A',
        marketShare: '35%',
        strengths: ['Forte presença digital', 'Preços competitivos'],
        weaknesses: ['Atendimento ao cliente', 'Variedade limitada'],
        priceComparison: '10% mais alto'
      },
      {
        name: 'Competidor B',
        marketShare: '25%',
        strengths: ['Qualidade superior', 'Marca estabelecida'],
        weaknesses: ['Preços elevados', 'Marketing tradicional'],
        priceComparison: '20% mais alto'
      }
    ];

    return {
      marketSize: marketSizeAnalysis[data.niche as keyof typeof marketSizeAnalysis] || marketSizeAnalysis.default,
      suggestedBid: `R$ ${suggestedBid}`,
      potentialReach: `${Math.floor(estimatedClicks * 100)} - ${Math.floor(estimatedClicks * 150)} pessoas/dia`,
      competitionLevel: 'Média',
      recommendedKeywords: [
        `${data.niche} ${data.location}`,
        `${data.niche} online`,
        `${data.niche} promoção`,
        `melhor ${data.niche}`,
        `${data.niche} profissional`,
        `${data.mainProducts.split(',')[0]} ${data.location}`,
        `comprar ${data.niche}`,
        `${data.niche} entrega rápida`,
        `${data.niche} premium`,
        `${data.niche} preço`
      ],
      estimatedResults: {
        clicks: estimatedClicks,
        impressions: estimatedClicks * 10,
        ctr: 3.5,
        averageCPC: parseFloat(suggestedBid),
        estimatedConversions: Math.floor(estimatedClicks * 0.02),
        estimatedROI: `${((estimatedClicks * 0.02 * averageOrderValue - budget) / budget * 100).toFixed(1)}%`
      },
      socialMedia: socialMediaMetrics,
      website: data.websiteUrl ? {
        monthlyVisitors: 15000,
        bounceRate: '45%',
        avgSessionDuration: '2:30',
        topPages: ['/produtos', '/sobre', '/contato'],
        conversionRate: '2.5%',
        deviceDistribution: {
          mobile: 65,
          desktop: 30,
          tablet: 5
        }
      } : undefined,
      competitors,
      marketOpportunities: [
        'Expansão para novas regiões',
        'Desenvolvimento de linha premium',
        'Parcerias com influenciadores',
        'Marketing de conteúdo especializado'
      ],
      recommendedStrategy: {
        adTypes: ['Search', 'Display', 'Remarketing'],
        budget: {
          distribution: {
            search: 60,
            display: 25,
            remarketing: 15
          },
          dailyBudget: budget / 30
        },
        targeting: {
          demographics: [
            `Idade: ${data.targetAge}`,
            `Gênero: ${data.targetGender}`,
            `Localização: ${data.location}`
          ],
          interests: [
            data.niche,
            'Compras online',
            'Tendências de mercado'
          ],
          behaviors: [
            'Compradores ativos',
            'Pesquisadores de preço',
            'Engajados com a marca'
          ]
        }
      }
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnalysis = analyzeData(campaignData);
    setAnalysis(newAnalysis);
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">AdsCraft AI</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configuração da Campanha</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nome da sua empresa"
                  value={campaignData.companyName}
                  onChange={(e) => setCampaignData({ ...campaignData, companyName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="niche" className="block text-sm font-medium text-gray-700">
                  Nicho de Mercado
                </label>
                <input
                  type="text"
                  id="niche"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex.: Moda, Tecnologia, Saúde"
                  value={campaignData.niche}
                  onChange={(e) => setCampaignData({ ...campaignData, niche: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="mainProducts" className="block text-sm font-medium text-gray-700">
                  Principais Produtos/Serviços
                </label>
                <input
                  type="text"
                  id="mainProducts"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex.: Roupas femininas, Acessórios"
                  value={campaignData.mainProducts}
                  onChange={(e) => setCampaignData({ ...campaignData, mainProducts: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="targetAge" className="block text-sm font-medium text-gray-700">
                    Faixa Etária
                  </label>
                  <input
                    type="text"
                    id="targetAge"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ex.: 25-40"
                    value={campaignData.targetAge}
                    onChange={(e) => setCampaignData({ ...campaignData, targetAge: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="targetGender" className="block text-sm font-medium text-gray-700">
                    Gênero
                  </label>
                  <select
                    id="targetGender"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={campaignData.targetGender}
                    onChange={(e) => setCampaignData({ ...campaignData, targetGender: e.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="all">Todos</option>
                    <option value="female">Feminino</option>
                    <option value="male">Masculino</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Localização
                </label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex.: São Paulo, Brasil"
                  value={campaignData.location}
                  onChange={(e) => setCampaignData({ ...campaignData, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700">
                  Perfil do Instagram
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">@</span>
                  </div>
                  <input
                    type="text"
                    id="instagramHandle"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-8"
                    placeholder="seu.perfil"
                    value={campaignData.instagramHandle}
                    onChange={(e) => setCampaignData({ ...campaignData, instagramHandle: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
                  Website (opcional)
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="https://www.seusite.com.br"
                  value={campaignData.websiteUrl}
                  onChange={(e) => setCampaignData({ ...campaignData, websiteUrl: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
                  Objetivo da Campanha
                </label>
                <select
                  id="objective"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={campaignData.objective}
                  onChange={(e) => setCampaignData({ ...campaignData, objective: e.target.value })}
                  required
                >
                  <option value="">Selecione o objetivo</option>
                  <option value="sales">Aumentar Vendas</option>
                  <option value="traffic">Tráfego para o Site</option>
                  <option value="awareness">Reconhecimento da Marca</option>
                  <option value="leads">Geração de Leads</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Orçamento Mensal
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="text"
                    id="budget"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-12"
                    placeholder="1000,00"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-gray-700">
                  Faturamento Mensal Médio
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="text"
                    id="monthlyRevenue"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-12"
                    placeholder="10000,00"
                    value={campaignData.monthlyRevenue}
                    onChange={(e) => setCampaignData({ ...campaignData, monthlyRevenue: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="currentCustomers" className="block text-sm font-medium text-gray-700">
                  Número de Clientes Atual (aproximado)
                </label>
                <input
                  type="number"
                  id="currentCustomers"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="100"
                  value={campaignData.currentCustomers}
                  onChange={(e) => setCampaignData({ ...campaignData, currentCustomers: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="productPriceRange" className="block text-sm font-medium text-gray-700">
                  Faixa de Preço dos Produtos
                </label>
                <input
                  type="text"
                  id="productPriceRange"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex.: R$ 100 - R$ 500"
                  value={campaignData.productPriceRange}
                  onChange={(e) => setCampaignData({ ...campaignData, productPriceRange: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Analisar e Criar Campanha
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {!showAnalysis ? (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-lg font-medium text-gray-900">Análise Completa</h3>
                  </div>
                  <p className="text-gray-600">
                    Nossa IA analisará seu perfil completo, incluindo presença digital e mercado.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Instagram className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-lg font-medium text-gray-900">Análise de Redes Sociais</h3>
                  </div>
                  <p className="text-gray-600">
                    Avaliação detalhada do seu perfil no Instagram e estratégias de crescimento.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-lg font-medium text-gray-900">Análise de Website</h3>
                  </div>
                  <p className="text-gray-600">
                    Avaliação do seu site e recomendações para melhorar a conversão.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-lg font-medium text-gray-900">Análise de Público</h3>
                  </div>
                  <p className="text-gray-600">
                    Identificação do seu público-alvo ideal e comportamento de compra.
                  </p>
                </div>
              </>
            ) : analysis ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Análise da Empresa</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Visão Geral do Mercado</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Tamanho do Mercado</p>
                          <p className="font-medium">{analysis.marketSize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nível de Competição</p>
                          <p className="font-medium">{analysis.competitionLevel}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Análise do Instagram</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Seguidores</p>
                          <p className="font-medium">{analysis.socialMedia.followers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Taxa de Engajamento</p>
                          <p className="font-medium">{analysis.socialMedia.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Posts por Semana</p>
                          <p className="font-medium">{analysis.socialMedia.postsPerWeek}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Média de Curtidas</p>
                          <p className="font-medium">{analysis.socialMedia.avgLikes}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Hashtags Mais Efetivas</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {analysis.socialMedia.topHashtags.map((hashtag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                            >
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {analysis.website && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Análise do Website</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Visitantes Mensais</p>
                            <p className="font-medium">{analysis.website.monthlyVisitors.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Taxa de Rejeição</p>
                            <p className="font-medium">{analysis.website.bounceRate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tempo Médio de Sessão</p>
                            <p className="font-medium">{analysis.website.avgSessionDuration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Taxa de Conversão</p>
                            <p className="font-medium">{analysis.website.conversionRate}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Distribuição de Dispositivos</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                              <span className="text-sm">Mobile: {analysis.website.deviceDistribution.mobile}%</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-sm">Desktop: {analysis.website.deviceDistribution.desktop}%</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                              <span className="text-sm">Tablet: {analysis.website.deviceDistribution.tablet}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Análise de Concorrentes</h4>
                      <div className="space-y-4">
                        {analysis.competitors.map((competitor, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h5 className="font-medium mb-2">{competitor.name}</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Market Share</p>
                                <p className="font-medium">{competitor.marketShare}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Comparação de Preço</p>
                                <p className="font-medium">{competitor.priceComparison}</p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Pontos Fortes</p>
                              <ul className="list-disc list-inside text-sm mt-1">
                                {competitor.strengths.map((strength, i) => (
                                  <li key={i}>{strength}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Estratégia Recomendada</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Tipos de Anúncios Recomendados</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {analysis.recommendedStrategy.adTypes.map((type, index) => (
                              <span
                                key={index}
                                 className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Distribuição do Orçamento</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Search Ads</span>
                              <span className="text-sm font-medium">{analysis.recommendedStrategy.budget.distribution.search}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${analysis.recommendedStrategy.budget.distribution.search}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Display Ads</span>
                              <span className="text-sm font-medium">{analysis.recommendedStrategy.budget.distribution.display}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${analysis.recommendedStrategy.budget.distribution.display}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Remarketing</span>
                              <span className="text-sm font-medium">{analysis.recommendedStrategy.budget.distribution.remarketing}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${analysis.recommendedStrategy.budget.distribution.remarketing}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Resultados Estimados</p>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Cliques/Mês</p>
                              <p className="font-medium">{analysis.estimatedResults.clicks.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Impressões/Mês</p>
                              <p className="font-medium">{analysis.estimatedResults.impressions.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">CTR Esperado</p>
                              <p className="font-medium">{analysis.estimatedResults.ctr}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Conversões Estimadas</p>
                              <p className="font-medium">{analysis.estimatedResults.estimatedConversions}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">ROI Estimado</p>
                              <p className="font-medium">{analysis.estimatedResults.estimatedROI}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Oportunidades de Mercado</p>
                          <ul className="list-disc list-inside text-sm mt-2">
                            {analysis.marketOpportunities.map((opportunity, index) => (
                              <li key={index} className="text-gray-700">{opportunity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
                      <AlertCircle className="h-4 w-4" />
                      <p>Esta análise é baseada nos dados fornecidos e em tendências de mercado atuais.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;