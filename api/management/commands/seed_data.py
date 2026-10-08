import datetime
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from api.models import (
    User, UserRole, BusinessDivision, Lead, LeadStatus,
    Customer, Appointment, AppointmentStatus, AppointmentMode,
    FollowUp, CalculationRecord, BlogPost
)

class Command(BaseCommand):
    help = 'Seeds initial users, sample leads, appointments, calculations, and blogs'

    def handle(self, *args, **options):
        self.stdout.write("Seeding comprehensive business data...")

        # 1. Create Users
        users_data = [
            {
                'username': 'superadmin',
                'email': 'director@quadrabiz.com',
                'first_name': 'Kalyan',
                'last_name': 'Enterprises',
                'role': UserRole.SUPER_ADMIN,
                'business_division': BusinessDivision.GENERAL,
                'phone': '+91 98480 12345',
                'city': 'Hyderabad',
                'password': 'admin123'
            },
            {
                'username': 'tata_agent',
                'email': 'insurance@quadrabiz.com',
                'first_name': 'Ramesh',
                'last_name': 'Verma (Tata AIA)',
                'role': UserRole.INSURANCE_ADMIN,
                'business_division': BusinessDivision.INSURANCE,
                'phone': '+91 98480 23456',
                'city': 'Hyderabad',
                'password': 'agent123'
            },
            {
                'username': 'herbal_rep',
                'email': 'wellness@quadrabiz.com',
                'first_name': 'Sunita',
                'last_name': 'Rao (Herbalife)',
                'role': UserRole.NUTRITION_ADMIN,
                'business_division': BusinessDivision.NUTRITION,
                'phone': '+91 98480 34567',
                'city': 'Visakhapatnam',
                'password': 'herbal123'
            },
            {
                'username': 'kangen_rep',
                'email': 'water@quadrabiz.com',
                'first_name': 'Vikram',
                'last_name': 'Reddy (Enagic Kangen)',
                'role': UserRole.KANGEN_ADMIN,
                'business_division': BusinessDivision.KANGEN,
                'phone': '+91 98480 45678',
                'city': 'Vijayawada',
                'password': 'kangen123'
            },
            {
                'username': 'solar_expert',
                'email': 'solar@quadrabiz.com',
                'first_name': 'Anil',
                'last_name': 'Sharma (Solar EPC)',
                'role': UserRole.SOLAR_ADMIN,
                'business_division': BusinessDivision.SOLAR,
                'phone': '+91 98480 56789',
                'city': 'Hyderabad',
                'password': 'solar123'
            },
            {
                'username': 'john_doe',
                'email': 'customer@example.com',
                'first_name': 'John',
                'last_name': 'Patel',
                'role': UserRole.CUSTOMER,
                'business_division': BusinessDivision.GENERAL,
                'phone': '+91 98480 99999',
                'city': 'Secunderabad',
                'password': 'user123'
            }
        ]

        created_users = {}
        for ud in users_data:
            pwd = ud.pop('password')
            user, created = User.objects.get_or_create(username=ud['username'], defaults=ud)
            if created or not user.check_password(pwd):
                user.set_password(pwd)
                if user.role == UserRole.SUPER_ADMIN:
                    user.is_staff = True
                    user.is_superuser = True
                user.save()
            created_users[user.username] = user

        # 2. Seed Sample Leads
        sample_leads = [
            # Tata AIA Insurance
            {
                'division': BusinessDivision.INSURANCE,
                'name': 'Rajeshwari Krishna',
                'email': 'rajeshwari.k@gmail.com',
                'phone': '+91 98491 11223',
                'city': 'Hyderabad',
                'service_interest': 'Tata AIA Sampoorna Raksha Supreme (₹1.5 Cr Cover)',
                'status': LeadStatus.PROPOSAL_SENT,
                'estimated_value': 48000,
                'notes': 'Requested quotation for 35yo non-smoker with 40-year term. Needs accidental rider.',
                'calculator_data': {'type': 'term_premium', 'sum_assured': 15000000, 'age': 35, 'term': 40, 'annual_est': 42000},
                'assigned_to': created_users['tata_agent']
            },
            {
                'division': BusinessDivision.INSURANCE,
                'name': 'Suresh Babu M.',
                'email': 'sureshbabu.m@outlook.com',
                'phone': '+91 98492 22334',
                'city': 'Guntur',
                'service_interest': 'Child Future Education Protection Plan',
                'status': LeadStatus.QUALIFIED,
                'estimated_value': 120000,
                'notes': 'Daughter aged 4. Looking for ₹50 Lakh corpus at age 18 for engineering/medical.',
                'calculator_data': {'type': 'child_education', 'target_corpus': 5000000, 'years_left': 14, 'monthly_sip': 14200},
                'assigned_to': created_users['tata_agent']
            },
            {
                'division': BusinessDivision.INSURANCE,
                'name': 'Venkatesh Naidu',
                'email': 'venkat.naidu@gmail.com',
                'phone': '+91 98493 33445',
                'city': 'Tirupati',
                'service_interest': 'Retirement Freedom Annuity Plan',
                'status': LeadStatus.WON,
                'estimated_value': 250000,
                'notes': 'Policy issued: Guaranteed monthly pension of ₹65,000 post age 60.',
                'assigned_to': created_users['tata_agent']
            },

            # Herbalife Nutrition
            {
                'division': BusinessDivision.NUTRITION,
                'name': 'Pooja Chawla',
                'email': 'pooja.fitness@gmail.com',
                'phone': '+91 98494 44556',
                'city': 'Visakhapatnam',
                'service_interest': 'Formula 1 Weight Management & Personalized Protein Shake',
                'status': LeadStatus.QUALIFIED,
                'estimated_value': 8500,
                'notes': 'Calculated BMI = 29.4 (Overweight). Target is to lose 12kg over 4 months with coach support.',
                'calculator_data': {'type': 'bmi_eval', 'height_cm': 162, 'weight_kg': 77, 'bmi': 29.34, 'goal': 'loss'},
                'assigned_to': created_users['herbal_rep']
            },
            {
                'division': BusinessDivision.NUTRITION,
                'name': 'Harish Chandra',
                'email': 'harish.c@yahoo.com',
                'phone': '+91 98495 55667',
                'city': 'Warangal',
                'service_interest': 'H24 Sports Nutrition & Muscle Recovery Program',
                'status': LeadStatus.CONTACTED,
                'estimated_value': 12000,
                'notes': 'Marathon runner needing hydration drink mix (CR7 Drive) and post-workout protein.',
                'assigned_to': created_users['herbal_rep']
            },
            {
                'division': BusinessDivision.NUTRITION,
                'name': 'Deepika Nair',
                'email': 'deepika.n@gmail.com',
                'phone': '+91 98496 66778',
                'city': 'Hyderabad',
                'service_interest': 'Cellular Nutrition & Energy Booster Pack',
                'status': LeadStatus.WON,
                'estimated_value': 15600,
                'notes': 'Active 90-day transformation participant. Already lost 4.2 kg in Month 1.',
                'assigned_to': created_users['herbal_rep']
            },

            # Kangen Water
            {
                'division': BusinessDivision.KANGEN,
                'name': 'Dr. K. Srinivas Rao',
                'email': 'dr.srinivas.cardio@gmail.com',
                'phone': '+91 98497 77889',
                'city': 'Hyderabad',
                'service_interest': 'Enagic Leveluk K8 8-Plate Ionizer Demo',
                'status': LeadStatus.PROPOSAL_SENT,
                'estimated_value': 343000,
                'notes': 'Attended online presentation. Requested home demo with ORP and pH test for family of 6.',
                'calculator_data': {'type': 'water_sizing', 'family_members': 6, 'daily_liters': 18, 'model_recommended': 'Leveluk K8'},
                'assigned_to': created_users['kangen_rep']
            },
            {
                'division': BusinessDivision.KANGEN,
                'name': 'Madhuri Builders & Promoters',
                'email': 'purchase@madhuribuilders.in',
                'phone': '+91 98498 88990',
                'city': 'Vijayawada',
                'service_interest': 'Leveluk Super 501 Commercial Ionizer',
                'status': LeadStatus.QUALIFIED,
                'estimated_value': 397000,
                'notes': 'Looking to install commercial unit for luxury corporate cafeteria & wellness lounge.',
                'assigned_to': created_users['kangen_rep']
            },
            {
                'division': BusinessDivision.KANGEN,
                'name': 'Balaram Raju',
                'email': 'balaram.raju@gmail.com',
                'phone': '+91 98499 12340',
                'city': 'Rajahmundry',
                'service_interest': 'Leveluk SD501 Platinum Ionizer',
                'status': LeadStatus.WON,
                'estimated_value': 277000,
                'notes': 'Installed and calibrated on March 15. Customer highly satisfied with drinking pH 9.5.',
                'assigned_to': created_users['kangen_rep']
            },

            # Solar Panel Installation
            {
                'division': BusinessDivision.SOLAR,
                'name': 'Sri Rama Vilas Residency (Villa #42)',
                'email': 'srirama.villa42@gmail.com',
                'phone': '+91 98470 23451',
                'city': 'Hyderabad',
                'service_interest': '5kW On-Grid Rooftop Solar with PM Surya Ghar Subsidy',
                'status': LeadStatus.PROPOSAL_SENT,
                'estimated_value': 285000,
                'notes': 'Monthly bill: ₹6,500. Expected monthly savings ₹5,200. Eligible for ₹78,000 Govt subsidy.',
                'calculator_data': {'type': 'solar_calculator', 'monthly_bill': 6500, 'system_kw': 5, 'annual_savings': 62400, 'subsidy': 78000, 'payback_years': 3.3},
                'assigned_to': created_users['solar_expert']
            },
            {
                'division': BusinessDivision.SOLAR,
                'name': 'Aditya Spinning Mills Ltd.',
                'email': 'planthead@adityagroup.com',
                'phone': '+91 98471 34562',
                'city': 'Kurnool',
                'service_interest': '100kW Industrial Rooftop Solar EPC',
                'status': LeadStatus.QUALIFIED,
                'estimated_value': 4200000,
                'notes': 'Industrial tariff @ ₹8.20/kWh. Roof area 10,000 sq.ft. RCC slab survey scheduled.',
                'assigned_to': created_users['solar_expert']
            },
            {
                'division': BusinessDivision.SOLAR,
                'name': 'Chaitanya Kumar (Duplex House)',
                'email': 'chaitanya.k@gmail.com',
                'phone': '+91 98472 45673',
                'city': 'Secunderabad',
                'service_interest': '3kW DCR Mono Perc Rooftop Solar',
                'status': LeadStatus.WON,
                'estimated_value': 175000,
                'notes': 'Net meter connected with TSSPDCL. Generating ~14 units daily. Subsidy credited.',
                'assigned_to': created_users['solar_expert']
            }
        ]

        for ld in sample_leads:
            Lead.objects.get_or_create(phone=ld['phone'], defaults=ld)

        # 2.1 Seed Verified Customers
        sample_customers = [
            {
                'division': BusinessDivision.INSURANCE,
                'name': 'Rajeshwari Krishna',
                'phone': '+91 98490 11223',
                'email': 'rajeshwari.k@example.com',
                'address': 'Banjara Hills Rd 12, Hyderabad',
                'total_purchases': 185000,
                'policy_or_system_details': 'Tata AIA Sampoorna Raksha Supreme (₹2.0 Cr Cover)',
                'notes': 'Premium paid annually via ECS. Next review Oct 2027.',
            },
            {
                'division': BusinessDivision.NUTRITION,
                'name': 'Pooja Chawla',
                'phone': '+91 98480 33445',
                'email': 'pooja.c@example.com',
                'address': 'Beach Road, Visakhapatnam',
                'total_purchases': 32000,
                'policy_or_system_details': 'Herbalife 90-Day Cellular Body Transformation Plan',
                'notes': 'Achieved -11kg milestone. Currently on maintenance plan.',
            },
            {
                'division': BusinessDivision.KANGEN,
                'name': 'Dr. K. Srinivas Rao',
                'phone': '+91 98481 99887',
                'email': 'dr.srinivas@example.com',
                'address': 'KIMS Quarters, Secunderabad',
                'total_purchases': 343000,
                'policy_or_system_details': 'Enagic Leveluk K8 Japanese Medical Ionizer',
                'notes': 'Installed at residential clinic. Recommended to 3 colleagues.',
            },
            {
                'division': BusinessDivision.SOLAR,
                'name': 'Chaitanya Kumar',
                'phone': '+91 98492 77665',
                'email': 'chaitanya.k@example.com',
                'address': 'Villa #42, Sri Rama Vilas, Tellapur, Hyderabad',
                'total_purchases': 285000,
                'policy_or_system_details': '5 kW Elevated Rooftop Solar Plant (PM Surya Ghar)',
                'notes': 'Zero monthly electricity bills achieved. Generation ~625 units/month.',
            },
            {
                'division': BusinessDivision.SOLAR,
                'name': 'Aditya Spinning Mills Ltd.',
                'phone': '+91 98471 34562',
                'email': 'planthead@adityagroup.com',
                'address': 'Industrial Estate, Kurnool',
                'total_purchases': 4200000,
                'policy_or_system_details': '100kW Industrial Rooftop Solar EPC',
                'notes': 'Commissioned in Jan 2026. Performing at 104% expected generation.',
            }
        ]

        for cust in sample_customers:
            Customer.objects.get_or_create(phone=cust['phone'], defaults=cust)

        # 3. Seed Appointments
        today = datetime.date.today()
        sample_appointments = [
            {
                'division': BusinessDivision.INSURANCE,
                'customer_name': 'Rajeshwari Krishna',
                'customer_phone': '+91 98491 11223',
                'customer_email': 'rajeshwari.k@gmail.com',
                'appointment_date': today + datetime.timedelta(days=1),
                'appointment_time': datetime.time(11, 0),
                'service_type': 'Tata AIA Sampoorna Raksha Supreme Proposal & Rider Customization',
                'mode': AppointmentMode.IN_PERSON,
                'status': AppointmentStatus.SCHEDULED,
                'location_or_link': 'Customer Residence, Banjara Hills Rd 12, Hyderabad',
                'notes': 'Carry brochure and medical declaration check-sheet.',
                'assigned_to': created_users['tata_agent']
            },
            {
                'division': BusinessDivision.NUTRITION,
                'customer_name': 'Pooja Chawla',
                'customer_phone': '+91 98494 44556',
                'customer_email': 'pooja.fitness@gmail.com',
                'appointment_date': today + datetime.timedelta(days=2),
                'appointment_time': datetime.time(16, 30),
                'service_type': 'Herbalife Wellness Profile & Personalized Diet Chart Review',
                'mode': AppointmentMode.ONLINE,
                'status': AppointmentStatus.SCHEDULED,
                'location_or_link': 'https://meet.google.com/xyz-quad-nutr',
                'notes': 'Discuss meal timing, protein requirements and hydration schedule.',
                'assigned_to': created_users['herbal_rep']
            },
            {
                'division': BusinessDivision.KANGEN,
                'customer_name': 'Dr. K. Srinivas Rao',
                'customer_phone': '+91 98497 77889',
                'customer_email': 'dr.srinivas.cardio@gmail.com',
                'appointment_date': today + datetime.timedelta(days=3),
                'appointment_time': datetime.time(18, 0),
                'service_type': 'Kangen Live Demo: ORP, pH Spectrum & Micro-Clustering Test',
                'mode': AppointmentMode.IN_PERSON,
                'status': AppointmentStatus.SCHEDULED,
                'location_or_link': 'KIMS Hospital Staff Quarters, Secunderabad',
                'notes': 'Bring portable demo kit, pH drops, negative ORP meter, and tea bag experiment.',
                'assigned_to': created_users['kangen_rep']
            },
            {
                'division': BusinessDivision.SOLAR,
                'customer_name': 'Sri Rama Vilas Residency (Villa #42)',
                'customer_phone': '+91 98470 23451',
                'customer_email': 'srirama.villa42@gmail.com',
                'appointment_date': today + datetime.timedelta(days=1),
                'appointment_time': datetime.time(14, 0),
                'service_type': '5kW Solar Rooftop Physical Shadow Analysis & Structural Inspection',
                'mode': AppointmentMode.IN_PERSON,
                'status': AppointmentStatus.SCHEDULED,
                'location_or_link': 'Villa #42, Sri Rama Vilas, Tellapur, Hyderabad',
                'notes': 'Measure shadow from water tank; check DISCOM sanction feasibility.',
                'assigned_to': created_users['solar_expert']
            }
        ]

        for appt in sample_appointments:
            Appointment.objects.get_or_create(
                customer_phone=appt['customer_phone'],
                appointment_date=appt['appointment_date'],
                defaults=appt
            )

        # 4. Seed Follow-ups
        first_lead = Lead.objects.filter(division=BusinessDivision.INSURANCE).first()
        if first_lead:
            FollowUp.objects.get_or_create(
                lead=first_lead,
                title='Follow up on e-KYC and medical appointment slot',
                defaults={
                    'division': BusinessDivision.INSURANCE,
                    'due_date': today + datetime.timedelta(days=2),
                    'priority': 'high',
                    'status': 'pending',
                    'notes': 'Confirm blood test schedule with SRL Diagnostics tie-up.'
                }
            )

        solar_lead = Lead.objects.filter(division=BusinessDivision.SOLAR).first()
        if solar_lead:
            FollowUp.objects.get_or_create(
                lead=solar_lead,
                title='Send PM Surya Ghar National Portal registration guide',
                defaults={
                    'division': BusinessDivision.SOLAR,
                    'due_date': today + datetime.timedelta(days=1),
                    'priority': 'high',
                    'status': 'pending',
                    'notes': 'Help consumer link Aadhaar with electricity bill consumer number.'
                }
            )

        # 5. Seed Calculation Records
        sample_calcs = [
            {
                'division': BusinessDivision.INSURANCE,
                'calculator_name': 'HLV Needs Calculator',
                'user_name': 'K. S. Narayana',
                'user_phone': '+91 99887 76655',
                'user_email': 'narayana.k@gmail.com',
                'input_data': {'annual_income': 1800000, 'current_age': 38, 'retire_age': 60, 'liabilities': 3500000, 'current_savings': 1500000},
                'result_data': {'recommended_cover': 28500000, 'hlv_multiple': '15.8x'}
            },
            {
                'division': BusinessDivision.NUTRITION,
                'calculator_name': 'BMI & Caloric Needs',
                'user_name': 'Ananya Sen',
                'user_phone': '+91 97766 55443',
                'user_email': 'ananya.s@gmail.com',
                'input_data': {'gender': 'female', 'age': 31, 'weight_kg': 68, 'height_cm': 158, 'activity': 'sedentary'},
                'result_data': {'bmi': 27.2, 'category': 'Overweight', 'ideal_weight_min': 46.2, 'ideal_weight_max': 62.4, 'daily_calories_target': 1480}
            },
            {
                'division': BusinessDivision.KANGEN,
                'calculator_name': 'Kangen Bottle Cost Savings',
                'user_name': 'Sanjay Gupta',
                'user_phone': '+91 96655 44332',
                'user_email': 'sanjay.gupta@biz.com',
                'input_data': {'monthly_bottled_water_spend': 4500, 'household_size': 5},
                'result_data': {'ten_year_bottle_cost': 540000, 'k8_machine_cost': 343000, 'net_savings': 197000, 'plastic_bottles_saved': 18250}
            },
            {
                'division': BusinessDivision.SOLAR,
                'calculator_name': 'PM Surya Ghar Solar Rooftop',
                'user_name': 'Vamsi Krishna',
                'user_phone': '+91 95544 33221',
                'user_email': 'vamsi.k@tech.com',
                'input_data': {'monthly_bill': 7200, 'state': 'Telangana'},
                'result_data': {'recommended_kw': 5, 'capital_cost': 285000, 'gov_subsidy': 78000, 'net_cost': 207000, 'monthly_savings': 5760, 'payback_years': 3.0}
            }
        ]
        for sc in sample_calcs:
            CalculationRecord.objects.get_or_create(
                calculator_name=sc['calculator_name'],
                user_phone=sc['user_phone'],
                defaults=sc
            )

        # 6. Seed Blog Posts for all 5 Categories
        sample_blogs = [
            # Insurance
            {
                'division': BusinessDivision.INSURANCE,
                'category': 'Insurance',
                'title': 'How Much Term Insurance Do You Actually Need? Understanding Human Life Value (HLV)',
                'slug': 'how-much-term-insurance-human-life-value',
                'excerpt': 'Why relying on an arbitrary 10x salary rule can leave your family underinsured, and how to calculate your true HLV scientifically.',
                'content': '''
Life insurance is not an investment product; it is the ultimate financial firewall for your family. Yet, over 70% of urban Indian families remain severely underinsured.

### What is Human Life Value (HLV)?
Human Life Value (HLV) measures the economic value of an individual to their family. If the breadwinner were to pass away prematurely, HLV represents the exact lump sum needed to:
1. Replace future lost earnings until retirement age.
2. Pay off existing home loans, car loans, and business liabilities immediately.
3. Secure milestone funds for children's higher education and marriage.
4. Fund everyday household expenses adjusted for 6-7% inflation.

### The Problem With Rule-of-Thumb Calculations
Many insurance buyers choose a round number like ₹50 Lakh or ₹1 Crore because it sounds substantial. However, with modern inflation:
- ₹1 Crore today will have the purchasing power of only ~₹41 Lakh in 15 years.
- Outstanding debts must be deducted first. If you hold a ₹45 Lakh home loan, a ₹1 Crore term cover leaves only ₹55 Lakh for your family's 20-30 years of survival.

### Tata AIA Advantage: Pure Protection With Living Benefits
With Tata AIA Sampoorna Raksha Supreme, you get flexible coverage terms up to age 100, critical illness living benefits covering up to 40 illnesses, and waiver of premium upon disability.

Use our interactive **HLV Calculator** right here on our website to discover your family's exact protection requirement today.
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
                'read_time': '5 min read',
                'tags': 'Term Insurance, Tata AIA, Financial Security, HLV'
            },
            {
                'division': BusinessDivision.INSURANCE,
                'category': 'Insurance',
                'title': 'Securing Your Child’s Ivy League & Medical Aspirations in an Era of 10% Education Inflation',
                'slug': 'securing-child-education-against-inflation',
                'excerpt': 'A 4-year engineering or medical degree costing ₹25 Lakh today will cost upwards of ₹70 Lakh by 2038. Here is your blueprint.',
                'content': '''
Higher education inflation in India consistently hovers around 10-12%, significantly outpacing headline CPI inflation.

### The Timeline Roadmap
If your child is currently 4 years old, you have exactly 14 years before university matriculation. 
A professional course priced at ₹25 Lakh today:
- In 7 years (Grade 6): ~₹48 Lakh
- In 14 years (College Entry): ~₹95 Lakh

### The Dual Need: Wealth Accumulation + Waiver of Premium
Many parents invest solely in mutual funds for child education. While equity delivers excellent compounding, it lacks protection: **what happens if the contributing parent passes away in year 4 of the 14-year plan?**

Tata AIA's dedicated Child Future solutions incorporate the **Waiver of Premium (WOP)** rider. If the parent passes away, the company pays all future premiums on their behalf, and the full guaranteed corpus is handed over to the child on their 18th birthday precisely as planned.
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
                'read_time': '4 min read',
                'tags': 'Child Education, Tata AIA, SIP, Inflation'
            },

            # Nutrition
            {
                'division': BusinessDivision.NUTRITION,
                'category': 'Nutrition',
                'title': 'The Science of Cellular Nutrition: Why Counting Calories Alone Is Not Enough',
                'slug': 'cellular-nutrition-and-metabolic-health',
                'excerpt': 'Discover how nourishing your body at the cellular level with balanced macro and micronutrients transforms energy and metabolic resilience.',
                'content': '''
Most modern diets fail because they focus exclusively on calorie deprivation rather than cellular nourishment. When your body is starved of essential amino acids, fiber, and micronutrients, your metabolic rate drops, cravings spike, and fatigue sets in.

### What is Cellular Nutrition?
Cellular nutrition is the principle that your trillions of cells require high-grade, bioavailable nutrients to function optimally:
1. **Bioavailable Protein:** Supports lean muscle mass, which is your primary engine for resting metabolic rate (BMR).
2. **Soluble & Insoluble Fiber:** Promotes gut microbiome diversity and stabilizes post-meal glycemic spikes.
3. **Targeted Antioxidants & Botanicals:** Neutralize daily oxidative stress caused by pollution, processed foods, and high-stress work lifestyles.

### The Herbalife Daily Wellness Foundation
Starting your morning with a nutrient-dense Formula 1 Nutritional Shake Mix provides:
- Up to 21 essential vitamins and minerals.
- High-quality soy and whey protein for satiety.
- Complex carbohydrates for sustained mental stamina without the afternoon crash.

*Disclaimer: Herbalife products are dietary supplements intended to support overall wellness and are not intended to diagnose, treat, cure, or prevent any disease.*
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
                'read_time': '6 min read',
                'tags': 'Herbalife, Nutrition, Wellness, Protein, Energy'
            },
            {
                'division': BusinessDivision.NUTRITION,
                'category': 'Nutrition',
                'title': 'Hydration, Electrolytes, and Daily Water Targets: Calculating What Your Body Actually Demands',
                'slug': 'hydration-electrolytes-water-targets',
                'excerpt': 'Why the traditional 8-glasses rule is outdated and how body mass, heat, and physical activity dictate your cellular hydration.',
                'content': '''
Mild dehydration—as little as 1.5% loss of bodily water—impairs cognitive focus, slows muscular reaction time, and triggers false hunger signals in the brain.

### Calculating Your Dynamic Water Requirement
A baseline human requires approximately 35ml of clean water per kilogram of body weight. 
- A 70kg individual requires baseline 2.45 Liters.
- Add 500ml - 750ml for every 45 minutes of vigorous exercise.
- Add 300ml - 500ml during hot and humid tropical conditions.

Try our **Water Intake Calculator** to personalize your hydration schedule today.
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80',
                'read_time': '4 min read',
                'tags': 'Hydration, Herbalife, Water Calculator, Vitality'
            },

            # Kangen Water
            {
                'division': BusinessDivision.KANGEN,
                'category': 'Kangen Water',
                'title': 'The Molecular Science of Ionized Hydrogen-Rich Water: Beyond Standard Filtration',
                'slug': 'molecular-science-ionized-hydrogen-water',
                'excerpt': 'Learn how Enagic platinum-dipped titanium electrolysis produces molecular hydrogen (H2) and negative Oxidation-Reduction Potential (ORP).',
                'content': '''
Water is not merely H2O. Across Japan and worldwide medical wellness facilities, electrolyzed reduced water (ERW) produced by Enagic Kangen machines has been studied for over 5 decades.

### Three Unique Properties of Kangen Water:
1. **Rich in Dissolved Molecular Hydrogen (H2):**
   Molecular hydrogen is the smallest molecule in the universe, allowing it to penetrate deep cellular membranes and the blood-brain barrier to selectively neutralize toxic hydroxyl free radicals.
2. **Negative ORP (Oxidation Reduction Potential):**
   While tap water and bottled water exhibit positive oxidative ORP (+200mV to +400mV), fresh Kangen water produces a negative ORP between -400mV and -850mV, acting as a potent liquid antioxidant.
3. **Micro-Clustering Structure:**
   Electrolysis restructures water cluster size from 15-20 molecules down to 5-6 hexagonal clusters, facilitating rapid cellular absorption and superior cellular hydration.

### The 5 Types of Water Produced by K8 / SD501:
- **Strong Kangen (pH 11.5):** Oil emulsifier and chemical-free produce wash that cleans pesticides off fruits and vegetables.
- **Kangen Drinking Water (pH 8.5 – 9.5):** Delicious, refreshing daily alkaline drinking water.
- **Clean Water (pH 7.0):** Filtered neutral water ideal for baby formula and pharmaceutical medication.
- **Beauty Water (pH 6.0):** Natural astringent and facial toner for radiant skin and hair shine.
- **Strong Acidic (pH 2.5):** Powerful eco-friendly disinfectant and sterilizer.

Book a free in-home demonstration to see the live pH and ORP tests!
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=80',
                'read_time': '6 min read',
                'tags': 'Kangen Water, Enagic, Ionized Water, Molecular Hydrogen, ORP'
            },
            {
                'division': BusinessDivision.KANGEN,
                'category': 'Kangen Water',
                'title': 'The Hidden Cost of Single-Use Bottled Water: Environmental & Financial Analysis',
                'slug': 'hidden-cost-bottled-water-kangen-solution',
                'excerpt': 'How a typical family spends over ₹4 Lakhs on plastic bottled water over 10 years, while ingesting microplastics and degrading the planet.',
                'content': '''
Did you know that a standard 1-liter plastic bottle of commercial mineral water contains on average 240,000 detectable nanoplastic fragments according to recent Columbia University studies?

### Financial Realities
A 4-to-5 member family consuming 6-8 liters of bottled/jar water daily spends between ₹3,500 and ₹6,000 every single month.
- Over 5 years: ₹2,10,000 - ₹3,60,000.
- Over 10 years: ₹4,20,000 - ₹7,20,000.
- And at the end of 10 years, you own zero equity, having dumped over 25,000 plastic containers into municipal landfills.

### The Enagic Investment
An Enagic Leveluk machine is built with medical-grade solid titanium plates dipped in platinum, lasting 20-25+ years with simple maintenance. It produces unlimited ionized antioxidant water for drinking, cooking, sanitization, and skin care for pennies per day.
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=1200&q=80',
                'read_time': '5 min read',
                'tags': 'Kangen Water, Eco Friendly, Plastic Free, Savings Calculator'
            },

            # Solar Energy
            {
                'division': BusinessDivision.SOLAR,
                'category': 'Solar',
                'title': 'PM Surya Ghar Muft Bijli Yojana: Complete Subsidy & Rooftop Solar Guide for 2026',
                'slug': 'pm-surya-ghar-muft-bijli-subsidy-guide',
                'excerpt': 'Everything you need to know about claiming up to ₹78,000 central government direct subsidy for residential rooftop solar.',
                'content': '''
The Government of India has accelerated the **PM Surya Ghar: Muft Bijli Yojana**, offering one of the most generous solar subsidy schemes in the world.

### Subsidy Slabs for Residential Households:
- **1 kW System:** ₹30,000 Central Subsidy
- **2 kW System:** ₹60,000 Central Subsidy
- **3 kW to 10 kW Systems:** ₹78,000 Flat Maximum Subsidy

### How Does the Subsidy Process Work?
1. **Site Feasibility & Quotation:** We inspect your rooftop, verify shadow-free area (approx. 100 sq.ft. per kW), and size your system.
2. **National Portal Application:** We handle registration on the National Solar Rooftop Portal with your DISCOM consumer number.
3. **Turnkey Installation:** Tier-1 DCR (Domestic Content Requirement) Mono PERC or TopCon panels and high-efficiency on-grid inverter installed.
4. **Net Metering & Inspection:** DISCOM officials test the installation and replace your standard meter with a bidirectional Net Meter.
5. **Direct Bank Transfer (DBT):** The subsidy amount (up to ₹78,000) is credited straight into your linked bank account within 30 days of commissioning!

### Return on Investment (ROI)
For a 5kW system generating ~600 units/month, savings average ₹4,500 - ₹5,500 monthly. The entire net capital cost is recovered in approximately 3 to 3.5 years, followed by 22+ years of essentially free electricity!
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
                'read_time': '7 min read',
                'tags': 'PM Surya Ghar, Solar Rooftop, Subsidy, Clean Energy, Net Metering'
            },
            {
                'division': BusinessDivision.SOLAR,
                'category': 'Solar',
                'title': 'On-Grid vs Off-Grid vs Hybrid Solar: Which Rooftop Architecture Is Right for You?',
                'slug': 'on-grid-vs-off-grid-hybrid-solar-architecture',
                'excerpt': 'Compare battery storage, net metering advantages, and commercial payback periods to select the optimal solar installation.',
                'content': '''
Choosing the correct solar architecture depends primarily on your local grid stability and tariff structure.

### 1. On-Grid Solar Systems (Most Popular & Cost-Effective)
- Connected directly to your local utility DISCOM via bidirectional Net Metering.
- Excess power generated during sunny daylight hours is exported back to the grid, spinning your meter backwards.
- Highest ROI and lowest maintenance because no expensive lead-acid or lithium battery banks are required.
- Eligible for the full PM Surya Ghar government subsidy.

### 2. Hybrid Solar Systems (Ultimate Energy Independence)
- Combines the best of grid connection and smart lithium-ion battery backup.
- Operates even during prolonged power outages while still allowing you to sell excess energy to DISCOM.
- Ideal for areas with frequent load-shedding or sensitive electronic equipment.

Calculate your exact system size and financial payback using our **Advanced Solar Calculator** on our portal!
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
                'read_time': '5 min read',
                'tags': 'Solar Architecture, On Grid, Net Metering, Battery Backup'
            },

            # General / Business Vision
            {
                'division': BusinessDivision.GENERAL,
                'category': 'General',
                'title': 'The Four Pillars of Longevity: Wealth, Cellular Wellness, Pure Hydration & Clean Energy',
                'slug': 'four-pillars-of-modern-longevity',
                'excerpt': 'How our four business divisions interlock to build a resilient, prosperous, and sustainable future for families and enterprises.',
                'content': '''
True prosperity is multi-dimensional. A family can achieve financial wealth, but without robust metabolic health, vitality is lost. Conversely, wellness cannot thrive in an environment compromised by contaminated water and fossil-fuel dependence.

Our founder envisioned **QuadraLife Enterprises** as a unified ecosystem built upon four foundational pillars:
1. **Financial Fortress (Tata AIA Life Insurance):** Ensuring that children's dreams and family dignity are bulletproof against life's uncertainties.
2. **Cellular Vitality (Herbalife Nutrition):** Restoring internal metabolic balance through targeted nutrition, optimal protein, and dedicated coaching.
3. **Pure Ionized Hydration (Enagic Kangen Water):** Empowering households with antioxidant-rich, hydrogen-infused water while ending plastic bottle pollution.
4. **Sustainable Energy Independence (Solar EPC):** Harvesting abundant sunlight to eliminate recurring electricity bills and decarbonize our communities.

We welcome you to explore all four divisions across our unified digital platform.
                ''',
                'cover_image': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
                'read_time': '4 min read',
                'tags': 'Founder Vision, QuadraLife, Sustainability, Wellness'
            }
        ]

        for blog in sample_blogs:
            BlogPost.objects.get_or_create(
                slug=blog['slug'],
                defaults=blog
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded comprehensive multi-business data!"))
