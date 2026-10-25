/**
 * حاسبة الدعم الملكي وحاسبة نطاقات
 * متوافقة مع التوجيهات الملكية الكريمة الصادرة في أكتوبر 2026
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
                b.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            });

            btn.classList.add('active', 'bg-emerald-700', 'text-white', 'shadow-md');
            btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');

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
            statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300';
            statusBadge.innerHTML = '<span>✓</span> مشمول بالدعم الشهري';
            statusTitle.textContent = 'أنت مشمول ببدل الدعم الشهري (500 ريال)';
            amountVal.textContent = '500';
            
            let desc = '';
            let listItems = [
                'يبدأ صرف البدل اعتباراً من 1 يناير 2027م بالتزامن مع تعديل تعريفتي الكهرباء والمياه.',
                'إجمالي الدعم السنوي المباشر: 6,000 ريال سعودي سنوياً.',
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
            detailsList.innerHTML = listItems.map(item => `<li class="flex items-start gap-2 text-gray-700 text-sm"><span class="text-emerald-600 font-bold">•</span><span>${item}</span></li>`).join('');

        } else if (val === 'private_employee') {
            // قطاع خاص
            statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-300';
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

            detailsList.innerHTML = listItems.map(item => `<li class="flex items-start gap-2 text-gray-700 text-sm"><span class="text-amber-600 font-bold">•</span><span>${item}</span></li>`).join('');

        } else {
            // غير مشمول
            statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border border-gray-300';
            statusBadge.innerHTML = '<span>✕</span> غير مشمول مباشرة حالياً';
            statusTitle.textContent = 'الفئة المحددة غير مشمولة بالبدل المباشر';
            amountVal.textContent = '0';
            statusDesc.textContent = 'يقتصر البدل المالي المباشر (500 ريال) على موظفي الدولة (مدنيين وعسكريين وبنود تشغيل)، المتقاعدين وأسرهم المستحقة، ومستفيدي الضمان الاجتماعي.';
            detailsList.innerHTML = `
                <li class="flex items-start gap-2 text-gray-700 text-sm"><span class="text-gray-500 font-bold">•</span><span>إذا كانت أسرتك مسجلة بالضمان الاجتماعي المطور، فيمكن لرب الأسرة الاستفادة من الدعم المقرر للأسر الضمانية.</span></li>
                <li class="flex items-start gap-2 text-gray-700 text-sm"><span class="text-gray-500 font-bold">•</span><span>يمكنك مراجعة برامج الدعم الحكومية التكميلية كحساب المواطن وبرامج الدعم الموجهة.</span></li>
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

        // الوضع الحالي (الحد الأدنى للاحتساب الكامل 4000، وأقل من 4000 إلى 3000 بنصف عامل)
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

        // المرحلة الأولى (الحد الأدنى للاحتساب الكامل 5000 ريال)
        let p1Ratio = 0;
        let p1Diff = 0;
        let p1Class = '';
        let p1Desc = '';

        if (salary >= 5000) {
            p1Ratio = 1.0;
            p1Class = 'text-emerald-700 bg-emerald-50 border-emerald-200';
            p1Desc = 'مستوفٍ للاحتساب الكامل (1.0). منشأتك لن تحتاج لتعديل راتبك للاستفادة الكاملة من توطينك.';
        } else {
            p1Diff = 5000 - salary;
            p1Class = 'text-amber-800 bg-amber-50 border-amber-200';
            p1Desc = `راتبك الحالي أقل من 5,000 ريال. لتحقيق الاحتساب الكامل (1.0)، تحتاج المنشأة لرفع راتبك بمقدار ${p1Diff.toLocaleString('ar-SA')} ريال شهرياً.`;
        }

        // المرحلة الثانية (الحد الأدنى للاحتساب الكامل 6000 ريال)
        let p2Ratio = 0;
        let p2Diff = 0;
        let p2Class = '';
        let p2Desc = '';

        if (salary >= 6000) {
            p2Ratio = 1.0;
            p2Class = 'text-emerald-700 bg-emerald-50 border-emerald-200';
            p2Desc = 'مستوفٍ للاحتساب الكامل (1.0) حتى بعد تطبيق المرحلة الثانية.';
        } else {
            p2Diff = 6000 - salary;
            p2Class = 'text-red-800 bg-red-50 border-red-200';
            p2Desc = `لتحقيق الاحتساب الكامل (1.0) في المرحلة النهائية، تحتاج المنشأة لرفع راتبك بمقدار إجمالي قدره ${p2Diff.toLocaleString('ar-SA')} ريال شهرياً.`;
        }

        document.getElementById('currentNitaqatVal').textContent = currentText;
        document.getElementById('phase1Card').className = `p-4 rounded-xl border ${p1Class}`;
        document.getElementById('phase1Desc').textContent = p1Desc;
        document.getElementById('phase2Card').className = `p-4 rounded-xl border ${p2Class}`;
        document.getElementById('phase2Desc').textContent = p2Desc;
    });
}

// 3. حاسبة الأثر التقديري لتعرفة الكهرباء والمياه
function initUtilityCalculator() {
    const housingType = document.getElementById('housingType');
    const familyMembers = document.getElementById('familyMembers');
    const currentElec = document.getElementById('currentElecBill');
    const currentWater = document.getElementById('currentWaterBill');
    const calcBtn = document.getElementById('calcUtilityBtn');
    const resultBox = document.getElementById('utilityResult');

    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
        const elec = parseFloat(currentElec.value) || 0;
        const water = parseFloat(currentWater.value) || 0;
        const members = parseInt(familyMembers.value) || 4;

        if (elec <= 0 && water <= 0) {
            alert('يرجى إدخال قيمة تقريبية لفاتورة الكهرباء أو المياه الحالية.');
            return;
        }

        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // تقدير نسبة التغير المحتملة (بين 12% إلى 20% تقريبياً بحسب حجم الاستهلاك وشرائح الاستهلاك الجديدة)
        const estElecIncrease = Math.round(elec * 0.16);
        const estWaterIncrease = Math.round(water * 0.18);
        const totalEstimatedIncrease = estElecIncrease + estWaterIncrease;
        const supportAllowance = 500;
        const netSurplus = supportAllowance - totalEstimatedIncrease;

        document.getElementById('estElecIncreaseVal').textContent = `+${estElecIncrease.toLocaleString('ar-SA')} ريال`;
        document.getElementById('estWaterIncreaseVal').textContent = `+${estWaterIncrease.toLocaleString('ar-SA')} ريال`;
        document.getElementById('totalEstIncreaseVal').textContent = `${totalEstimatedIncrease.toLocaleString('ar-SA')} ريال`;

        const netBox = document.getElementById('netSurplusBox');
        const netVal = document.getElementById('netSurplusVal');
        const netDesc = document.getElementById('netSurplusDesc');

        if (netSurplus >= 0) {
            netBox.className = 'p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900';
            netVal.textContent = `فائض إيجابي: +${netSurplus.toLocaleString('ar-SA')} ريال شهرياً`;
            netDesc.textContent = 'بدل الدعم الشهري (500 ريال) يغطي بالكامل الزيادة التقديرية في فواتيرك ويوفر لك فائضاً نقدياً إضافياً كل شهر!';
        } else {
            const deficit = Math.abs(netSurplus);
            netBox.className = 'p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900';
            netVal.textContent = `تغطية أكثر من 80% من الزيادة (عجز بسيط: ${deficit.toLocaleString('ar-SA')} ريال)`;
            netDesc.textContent = 'بدل الـ 500 ريال يخفف الجزء الأكبر من الأثر، ونوصي باتباع أساليب ترشيد استهلاك الطاقة والمياه للبقاء دائماً ضمن نطاق الفائض الإيجابي.';
        }
    });
}

// أزرار المشاركة
function initShareButtons() {
    const shareText = encodeURIComponent('احسب الآن استحقاقك لبدل الـ 500 ريال وتأثير رفع أجور التوطين في نطاقات إلى 5,000 ثم 6,000 ريال وفق الأوامر الملكية الكريمة:');
    const shareUrl = encodeURIComponent(window.location.href);

    const whatsappBtn = document.getElementById('shareWhatsApp');
    const twitterBtn = document.getElementById('shareTwitter');
    const copyBtn = document.getElementById('copyLinkBtn');

    if (whatsappBtn) {
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
    }

    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=الأوامر_الملكية,بدل_500_ريال,نطاقات`;
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✓</span> تم نسخ الرابط بنجاح!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2500);
            }).catch(() => {
                alert('تم تحديد الرابط، يمكنك نسخه من شريط العنوان.');
            });
        });
    }
}
