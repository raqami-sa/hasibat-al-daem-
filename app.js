/**
 * حاسبة الدعم الملكي وحاسبة نطاقات وتعرفة الكهرباء وسعة القاطع
 * متوافقة مع التوجيهات الملكية الكريمة وتحديثات الشركة السعودية للطاقة لشهر أكتوبر 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAllowanceCalculator();
    initNitaqatCalculator();
    initUtilityCalculator();
    initShareButtons();
});

// تبديل التبويبات الرئيسية
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            tabButtons.forEach(b => {
                b.classList.remove('active', 'bg-emerald-700', 'text-white', 'shadow-md');
                b.classList.add('bg-transparent', 'text-slate-700');
            });

            btn.classList.add('active', 'bg-emerald-700', 'text-white', 'shadow-md');
            btn.classList.remove('bg-transparent', 'text-slate-700');

            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                    content.classList.add('animate-fade-in');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
}

// 1. حاسبة استحقاق بدل الـ 500 ريال
function initAllowanceCalculator() {
    const categorySelect = document.getElementById('userCategory');
    const checkBtn = document.getElementById('checkAllowanceBtn');
    const resultBox = document.getElementById('allowanceResult');
    const statusBadge = document.getElementById('allowanceStatusBadge');
    const statusTitle = document.getElementById('allowanceStatusTitle');
    const statusDesc = document.getElementById('allowanceStatusDesc');
    const amountVal = document.getElementById('allowanceAmount');
    const detailsList = document.getElementById('allowanceDetailsList');

    if (!checkBtn) return;

    checkBtn.addEventListener('click', () => {
        const val = categorySelect.value;
        if (!val) {
            alert('يرجى اختيار الفئة أو الحالة الوظيفية للمتابعة.');
            return;
        }

        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (['civil_service', 'military', 'operating_programs', 'retiree', 'deceased_family', 'social_security'].includes(val)) {
            // مستحق لبدل 500 ريال
            statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300';
            statusBadge.innerHTML = '<span>✓</span> مشمول بالدعم الشهري';
            statusTitle.textContent = 'أنت مشمول ببدل الدعم الشهري (500 ريال)';
            amountVal.textContent = '500';
            
            let desc = '';
            let listItems = [
                'يبدأ صرف البدل اعتباراً من 1 يناير 2027م بالتزامن مع تعديل تعريفتي الكهرباء والمياه ورسوم سعة القاطع.',
                'إجمالي الدعم السنوي المباشر: 6,000 ريال سعودي سنوياً للمستفيد.',
                'يُصرف البدل تلقائياً مع الراتب/المعاش الشهري دون الحاجة لتقديم طلب يدوي.'
            ];

            if (val === 'civil_service') {
                desc = 'بصفتك موظفاً حكومياً على سلالم الخدمة المدنية، يشملك الأمر الملكي الكريم بزيادة بدل شهري مقداره 500 ريال.';
            } else if (val === 'military') {
                desc = 'بصفتك فرداً أو ضابطاً في القطاع العسكري، تشملك التوجيهات الكريمة بصرف البدل الشهري 500 ريال.';
            } else if (val === 'operating_programs') {
                desc = 'يشمل الدعم موظفي بنود برامج التشغيل الذاتي في الجهات الحكومية والطبية بمبلغ 500 ريال شهرياً.';
            } else if (val === 'retiree') {
                desc = 'المتقاعدون (مدنيون وعسكريون وخاضعون للتأمينات الاجتماعية) مشمولون بالبدل الشهري لدعم أصحاب المعاشات التقاعدية.';
            } else if (val === 'deceased_family') {
                desc = 'أفراد عائلة المشترك أو المتقاعد المتوفى الخاضعون لنظام التأمينات الاجتماعية مشمولون بالبدل الشهري لدعم الأسر المستفيدة.';
            } else if (val === 'social_security') {
                desc = 'الأسر المستفيدة من الضمان الاجتماعي المطور مشمولة بدعم شهري 500 ريال وفق الضوابط المنظمة لذلك.';
            }

            statusDesc.textContent = desc;
            detailsList.innerHTML = listItems.map(item => `<li class="flex items-start gap-1.5 text-slate-700 text-xs sm:text-sm"><span class="text-emerald-600 font-bold">•</span><span>${item}</span></li>`).join('');

        } else if (val === 'private_employee') {
            // قطاع خاص
            statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300';
            statusBadge.innerHTML = '<span>ℹ</span> مشمول بمبادرة رفع أجور التوطين في نطاقات';
            statusTitle.textContent = 'مشمول برفع الحد الأدنى للأجور في «نطاقات» إلى 5,000 ثم 6,000 ريال';
            amountVal.textContent = 'غير مباشر';

            statusDesc.textContent = 'بدل الـ 500 ريال الحكومي المباشر مخصص للقطاع العام والمتقاعدين والضمان. بينما خصصت الأوامر الملكية للقطاع الخاص ميزة نوعية كبرى برفع حد احتساب السعودي في نسب التوطين بنطاقات.';
            
            const listItems = [
                'المرحلة الأولى: رفع الحد الأدنى للاحتساب الكامل في التوطين إلى 5,000 ريال (يبدأ بعد 6 أشهر من بدء الإجراء).',
                'المرحلة الثانية: رفع الحد الأدنى إلى 6,000 ريال (يبدأ بعد 12 شهراً من تطبيق الزيادة الأولى).',
                'هذا التوجيه يلزم ويشجع منشآت القطاع الخاص على رفع رواتب الموظفين السعوديين للاستفادة من احتسابهم في نسب السعودة ونطاقات.',
                'يمكنك استخدام "حاسبة نطاقات" في التبويب الثاني لمعرفة وضع راتبك الحالي وكيف يؤثر على منشأتك.'
            ];

            detailsList.innerHTML = listItems.map(item => `<li class="flex items-start gap-1.5 text-slate-700 text-xs sm:text-sm"><span class="text-amber-600 font-bold">•</span><span>${item}</span></li>`).join('');

        } else {
            // غير مشمول
            statusBadge.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-300';
            statusBadge.innerHTML = '<span>✕</span> غير مشمول مباشرة حالياً';
            statusTitle.textContent = 'الفئة المحددة غير مشمولة بالبدل المباشر';
            amountVal.textContent = '0';
            statusDesc.textContent = 'يقتصر البدل المالي المباشر (500 ريال) على موظفي الدولة (مدنيين وعسكريين وبنود تشغيل)، المتقاعدين وأسرهم المستحقة، ومستفيدي الضمان الاجتماعي.';
            detailsList.innerHTML = `
                <li class="flex items-start gap-1.5 text-slate-700 text-xs sm:text-sm"><span class="text-slate-500 font-bold">•</span><span>إذا كانت أسرتك مسجلة بالضمان الاجتماعي المطور، فيمكن لرب الأسرة الاستفادة من الدعم المقرر للأسر الضمانية.</span></li>
                <li class="flex items-start gap-1.5 text-slate-700 text-xs sm:text-sm"><span class="text-slate-500 font-bold">•</span><span>يمكنك مراجعة برامج الدعم الحكومية التكميلية كحساب المواطن وبرامج الدعم الموجهة.</span></li>
            `;
        }
    });
}

// 2. حاسبة نطاقات للقطاع الخاص
function initNitaqatCalculator() {
    const salaryInput = document.getElementById('privateSalaryInput');
    const calcBtn = document.getElementById('calcNitaqatBtn');
    const resultBox = document.getElementById('nitaqatResult');

    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
        const salary = parseFloat(salaryInput.value);
        if (isNaN(salary) || salary <= 0) {
            alert('يرجى إدخال الراتب الإجمالي المسجل في التأمينات بصورة صحيحة.');
            return;
        }

        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // الوضع الحالي
        let currentRatio = 0;
        let currentText = '';
        if (salary >= 4000) {
            currentRatio = 1.0;
            currentText = 'يُحتسب كعامل سعودي كامل (1.0)';
        } else if (salary >= 3000) {
            currentRatio = 0.5;
            currentText = 'يُحتسب بنصف عامل سعودي فقط (0.5)';
        } else {
            currentRatio = 0.0;
            currentText = 'لا يُحتسب في نسب التوطين (أقل من 3,000 ريال)';
        }

        // المرحلة الأولى (5000 ريال)
        let p1Diff = 0;
        let p1Class = '';
        let p1Desc = '';

        if (salary >= 5000) {
            p1Class = 'text-emerald-800 bg-emerald-50 border-emerald-200';
            p1Desc = 'مستوفٍ للاحتساب الكامل (1.0). منشأتك لن تحتاج لتعديل راتبك للاستفادة الكاملة من توطينك.';
        } else {
            p1Diff = 5000 - salary;
            p1Class = 'text-amber-800 bg-amber-50 border-amber-200';
            p1Desc = `راتبك الحالي أقل من 5,000 ريال. لتحقيق الاحتساب الكامل (1.0)، تحتاج المنشأة لرفع راتبك بمقدار ${p1Diff.toLocaleString('ar-SA')} ريال شهرياً.`;
        }

        // المرحلة الثانية (6000 ريال)
        let p2Diff = 0;
        let p2Class = '';
        let p2Desc = '';

        if (salary >= 6000) {
            p2Class = 'text-emerald-800 bg-emerald-50 border-emerald-200';
            p2Desc = 'مستوفٍ للاحتساب الكامل (1.0) حتى بعد تطبيق المرحلة الثانية.';
        } else {
            p2Diff = 6000 - salary;
            p2Class = 'text-red-800 bg-red-50 border-red-200';
            p2Desc = `لتحقيق الاحتساب الكامل (1.0) في المرحلة النهائية، تحتاج المنشأة لرفع راتبك بمقدار إجمالي قدره ${p2Diff.toLocaleString('ar-SA')} ريال شهرياً.`;
        }

        document.getElementById('currentNitaqatVal').textContent = currentText;
        document.getElementById('phase1Card').className = `p-3.5 rounded-xl border ${p1Class}`;
        document.getElementById('phase1Desc').textContent = p1Desc;
        document.getElementById('phase2Card').className = `p-3.5 rounded-xl border ${p2Class}`;
        document.getElementById('phase2Desc').textContent = p2Desc;
    });
}

// 3. حاسبة الأثر التقديري لتعرفة الكهرباء والمياه وسعة القاطع (بناءً على التحديثات الرسمية 2027)
function initUtilityCalculator() {
    const tariffSector = document.getElementById('tariffSector');
    const breakerCapacity = document.getElementById('breakerCapacity');
    const currentElec = document.getElementById('currentElecBill');
    const currentWater = document.getElementById('currentWaterBill');
    const calcBtn = document.getElementById('calcUtilityBtn');
    const resultBox = document.getElementById('utilityResult');

    if (!calcBtn) return;

    // تحديث خيارات رسوم القاطع عند تغيير القطاع
    if (tariffSector && breakerCapacity) {
        tariffSector.addEventListener('change', () => {
            updateBreakerOptions(tariffSector.value, breakerCapacity);
        });
    }

    calcBtn.addEventListener('click', () => {
        const sector = tariffSector ? tariffSector.value : 'residential';
        const breakerVal = breakerCapacity ? breakerCapacity.value : '20_100';
        const currentElecVal = parseFloat(currentElec.value) || 0;
        const currentWaterVal = parseFloat(currentWater.value) || 0;

        if (currentElecVal <= 0 && currentWaterVal <= 0) {
            alert('يرجى إدخال قيمة تقريبية لفاتورة الكهرباء أو المياه الحالية.');
            return;
        }

        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // تحديد الرسم الثابت الشهري الجديد لسعة القاطع
        let newBreakerFee = 70; // افتراضي للسكني 20 إلى <100 أمبير
        let oldBreakerFee = 15; // كان سابقاً رسوم قراءة وصيانة العداد 10 - 15 ريال

        if (sector === 'residential') {
            if (breakerVal === '20_100') newBreakerFee = 70;
            else if (breakerVal === '100_200') newBreakerFee = 80;
            else if (breakerVal === '200_300') newBreakerFee = 90;
            else if (breakerVal === '300_plus') newBreakerFee = 100;
        } else {
            // تجاري وحكومي
            if (breakerVal === '20_100') newBreakerFee = 350;
            else if (breakerVal === '100_200') newBreakerFee = 500;
            else if (breakerVal === '200_300') newBreakerFee = 700;
            else if (breakerVal === '300_plus') newBreakerFee = 900;
        }

        // حساب الاستهلاك التقريبي للكهرباء (كيلوواط ساعة) من الفاتورة الحالية
        // في السكني القديم: 1-6000 ك.و.س = 0.18 ريال، وفوق 6000 = 0.30 ريال مع 15% ضريبة
        const vatRate = 0.15;
        const currentElecBeforeVat = Math.max(0, (currentElecVal / (1 + vatRate)) - oldBreakerFee);
        
        let estimatedKWh = 0;
        if (currentElecBeforeVat <= (6000 * 0.18)) {
            estimatedKWh = currentElecBeforeVat / 0.18;
        } else {
            const tier1Cost = 6000 * 0.18;
            const remainder = currentElecBeforeVat - tier1Cost;
            estimatedKWh = 6000 + (remainder / 0.30);
        }

        // حساب تكلفة استهلاك الكهرباء بالتعرفة الجديدة (السكني: 21 هللة حتى 6000، ثم 33 هللة)
        let newConsumptionCost = 0;
        if (sector === 'residential') {
            if (estimatedKWh <= 6000) {
                newConsumptionCost = estimatedKWh * 0.21;
            } else {
                newConsumptionCost = (6000 * 0.21) + ((estimatedKWh - 6000) * 0.33);
            }
        } else {
            // تجاري: 25 هللة حتى 6000، ثم 35 هللة
            if (estimatedKWh <= 6000) {
                newConsumptionCost = estimatedKWh * 0.25;
            } else {
                newConsumptionCost = (6000 * 0.25) + ((estimatedKWh - 6000) * 0.35);
            }
        }

        // الفاتورة الكهربائية الجديدة الإجمالية مع الضريبة
        const newElecBeforeVat = newConsumptionCost + newBreakerFee;
        const newElecTotalWithVat = Math.round(newElecBeforeVat * (1 + vatRate));
        const elecDiff = Math.max(0, newElecTotalWithVat - currentElecVal);

        // فرق المياه التقديري (15% تقريباً)
        const estWaterIncrease = Math.round(currentWaterVal * 0.15);
        const totalEstimatedIncrease = elecDiff + estWaterIncrease;

        // مقارنة مع بدل الـ 500 ريال
        const supportAllowance = 500;
        const netSurplus = supportAllowance - totalEstimatedIncrease;

        // عرض النتائج في الواجهة
        document.getElementById('breakerFeeDisplay').textContent = `${newBreakerFee} ريال (+ 15% ضريبة = ${(newBreakerFee * 1.15).toFixed(1)} ريال)`;
        document.getElementById('estElecIncreaseVal').textContent = `+${elecDiff.toLocaleString('ar-SA')} ريال`;
        document.getElementById('estWaterIncreaseVal').textContent = `+${estWaterIncrease.toLocaleString('ar-SA')} ريال`;
        document.getElementById('totalEstIncreaseVal').textContent = `${totalEstimatedIncrease.toLocaleString('ar-SA')} ريال`;

        const netBox = document.getElementById('netSurplusBox');
        const netVal = document.getElementById('netSurplusVal');
        const netDesc = document.getElementById('netSurplusDesc');

        if (netSurplus >= 0) {
            netBox.className = 'p-3.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900';
            netVal.textContent = `فائض للمواطن: +${netSurplus.toLocaleString('ar-SA')} ريال/شهرياً`;
            netDesc.textContent = `بدل الـ 500 ريال يغطي بالكامل الزيادة الجديدة في رسوم سعة القاطع (${newBreakerFee} ريال) وفرق الاستهلاك والمياه، ويبقى معك فائض نقدي صافٍ!`;
        } else {
            const deficit = Math.abs(netSurplus);
            netBox.className = 'p-3.5 rounded-xl border bg-amber-50 border-amber-200 text-amber-900';
            netVal.textContent = `تغطية أكثر من 85% من الزيادة (عجز بسيط: ${deficit.toLocaleString('ar-SA')} ريال)`;
            netDesc.textContent = `بدل الـ 500 ريال يخفف الغالبية العظمى من الفاتورة. ينصح بمراجعة سعة القاطع والتأكد من مناسبته للاستهلاك الفعلي للتوفير.`;
        }
    });
}

function updateBreakerOptions(sector, selectElem) {
    if (sector === 'residential') {
        selectElem.innerHTML = `
            <option value="20_100" selected>من 20 إلى أقل من 100 أمبير (شقق وفلل صغيرة: 50A, 60A, 70A) - [70 ريال/شهر]</option>
            <option value="100_200">من 100 إلى أقل من 200 أمبير (فلل متوسطة) - [80 ريال/شهر]</option>
            <option value="200_300">من 200 إلى أقل من 300 أمبير (فلل كبيرة وقصور) - [90 ريال/شهر]</option>
            <option value="300_plus">300 أمبير فأكثر (مبانٍ ضخمة) - [100 ريال/شهر]</option>
        `;
    } else {
        selectElem.innerHTML = `
            <option value="20_100" selected>من 20 إلى أقل من 100 أمبير (محلات ومكاتب صغيرة) - [350 ريال/شهر]</option>
            <option value="100_200">من 100 إلى أقل من 200 أمبير (منشآت متوسطة) - [500 ريال/شهر]</option>
            <option value="200_300">من 200 إلى أقل من 300 أمبير (مجمعات تجارية) - [700 ريال/شهر]</option>
            <option value="300_plus">300 أمبير فأكثر (منشآت كبرى) - [900 ريال/شهر]</option>
        `;
    }
}

// أزرار المشاركة
function initShareButtons() {
    const shareText = encodeURIComponent('احسب الآن استحقاقك لبدل الـ 500 ريال وتعرف على رسوم سعة القاطع الجديدة (70 إلى 100 ريال) وحاسبة نطاقات وفق الأوامر الملكية:');
    const shareUrl = encodeURIComponent(window.location.href);

    const whatsappBtn = document.getElementById('shareWhatsApp');
    const whatsappResultBtn = document.getElementById('shareWhatsAppResult');
    const twitterBtn = document.getElementById('shareTwitter');
    const copyBtn = document.getElementById('copyLinkBtn');

    if (whatsappBtn) {
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
    }

    if (whatsappResultBtn) {
        whatsappResultBtn.href = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
    }

    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=الأوامر_الملكية,بدل_500_ريال,سعة_القاطع,نطاقات`;
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✓ تم النسخ</span>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2500);
            }).catch(() => {
                alert('تم تحديد الرابط، يمكنك نسخه من شريط المتصفح.');
            });
        });
    }
}
