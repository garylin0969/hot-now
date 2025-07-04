import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Privacy = () => {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <Tabs defaultValue="zh" className="w-full">
                <div className="mb-6 flex w-full justify-center">
                    <TabsList className="text-muted-foreground bg-transparent">
                        <TabsTrigger
                            value="zh"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2"
                        >
                            繁體中文
                        </TabsTrigger>
                        <TabsTrigger
                            value="en"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2"
                        >
                            English
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="zh">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Hot Now 隱私權政策</CardTitle>
                            <CardDescription className="text-center text-base">
                                最後更新日期：{new Date().toLocaleDateString('zh-TW')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">隱私保護承諾</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    我們重視您的隱私。本服務不會收集、儲存或分享任何可識別您個人身份的資訊。
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">數據收集說明</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    為了改善服務體驗，我們會透過 Google Analytics 收集匿名使用行為數據。
                                    這些資料僅用於統計與分析，不會與任何個人識別資料相關聯，也不會提供給第三方。
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">聯絡方式</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    如果您對此隱私政策有任何疑問，請聯絡我們。
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="en">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Hot Now Privacy Policy</CardTitle>
                            <CardDescription className="text-center text-base">
                                Last updated: {new Date().toLocaleDateString('en-US')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Privacy Protection Commitment</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We value your privacy. This service does not collect, store, or share any personally
                                    identifiable information.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Data Collection</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To improve the service experience, we use Google Analytics to collect anonymous
                                    usage data. This data is used solely for statistical analysis and is never
                                    associated with any personally identifiable information or shared with third
                                    parties.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Contact Information</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about this privacy policy, please contact us.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Privacy;
