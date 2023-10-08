const makePageObj = options => {
    const { url, pageId = 0, title = 'title', isPc = false, ssim = 0.5, persion = "waynegong" } = options;
    return {
        page_id: pageId,
        title,
        url,
        isPc,
        toPerson: persion,
        ssimThreshold: ssim,
        dyncparamsList: [],
        paramFlag: 0,
        paramKey: '',
        audits: []
    };
};
//# sourceMappingURL=debug.js.map