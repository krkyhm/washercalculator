const shelfSizes = {
    width: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    depth: [200, 300, 400, 500, 600, 700, 800, 900],
    height: [750, 900, 1200, 1500, 1800, 2100]
};

document.getElementById('sizeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const width = parseInt(document.getElementById('width').value) + 60;
    const depth = parseInt(document.getElementById('depth').value);
    let height = parseInt(document.getElementById('height').value) + 120;
    const tiers = parseInt(document.getElementById('tiers').value);

    const additionalHeight = (tiers - 1) * 300;
    height += additionalHeight;

    if (height > 1980) {
        height = 2100;
    }

    const recommendedWidth = shelfSizes.width.find(w => w >= width) || '적절한 가로(폭) 사이즈가 없습니다';
    const recommendedDepth = shelfSizes.depth.find(d => d >= depth) || '적절한 세로(깊이) 사이즈가 없습니다';
    const recommendedHeight = shelfSizes.height.find(h => h >= height) || '적절한 높이 사이즈가 없습니다';

    let resultMessage = `추천하는 선반 사이즈:\n`;

    if (typeof recommendedWidth === 'string') {
        resultMessage += `${recommendedWidth}\n`;
    } else {
        resultMessage += `가로 ${recommendedWidth}\n`;
    }

    if (typeof recommendedDepth === 'string') {
        resultMessage += `${recommendedDepth}\n`;
    } else {
        resultMessage += `깊이 ${recommendedDepth}\n`;
    }

    if (typeof recommendedHeight === 'string') {
        resultMessage += `${recommendedHeight}\n`;
    } else {
        resultMessage += `최소 높이 ${recommendedHeight}\n`;
    }

    if (typeof recommendedWidth !== 'string' && typeof recommendedDepth !== 'string') {
        const sideSupportWidth = recommendedWidth;
        const sideSupportDepth = recommendedDepth;

        resultMessage += `+ ${sideSupportWidth}측면보강대 1개\n`;
        resultMessage += `+ ${sideSupportDepth}측면보강대 2개\n`;
    }

    resultMessage += "\n가로와 깊이 사이즈는 외경 1.5cm의 여유공간이 필요합니다.";

    document.getElementById('result').innerText = resultMessage;
});
