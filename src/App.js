import React, { useState, useEffect } from 'react';
import {
  Clock,
  Heart,
  ChevronRight,
  Plus,
  Check,
  Coffee,
  Compass,
  Lightbulb,
  Bell,
  Settings,
  MapPin,
  Car,
  ShoppingBag,
  BookOpen,
  Activity,
  Home,
  Trash2,
  ShieldAlert,
  Eye,
  CheckSquare,
  MessageCircle,
} from 'lucide-react';

const getWeekDays = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayOfWeek);

  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const fullNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push({
      short: dayNames[i],
      full: fullNames[i],
      dateNumber: d.getDate(),
      dateObj: d,
      isToday: d.toDateString() === today.toDateString(),
    });
  }
  return days;
};

const CARD_THEMES = [
  {
    bg: 'bg-rose-950/40 border-rose-900/40 text-rose-100',
    iconBg: 'bg-rose-500 text-white',
    subText: 'text-rose-300/80',
    chip: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  {
    bg: 'bg-indigo-950/40 border-indigo-900/40 text-indigo-100',
    iconBg: 'bg-indigo-500 text-white',
    subText: 'text-indigo-300/80',
    chip: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    bg: 'bg-amber-950/40 border-amber-900/40 text-amber-100',
    iconBg: 'bg-amber-500 text-slate-950',
    subText: 'text-amber-300/80',
    chip: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    bg: 'bg-teal-950/40 border-teal-900/40 text-teal-100',
    iconBg: 'bg-teal-500 text-slate-950',
    subText: 'text-teal-300/80',
    chip: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
];

const DEFAULT_TIMELINE_TASKS = [
  {
    id: '1',
    day: 'Monday',
    time: '07:30 AM',
    title: 'School lunch & water bottles',
    description: 'Pack sliced apples, pretzels and refill thermos before wake-up',
    kid: 'Leo (7)',
    type: 'morning',
    done: false,
  },
  {
    id: '2',
    day: 'Monday',
    time: '09:00 AM',
    title: 'Check Kita extra clothes box',
    description: 'Replace wet mud trousers and spare socks in cubby',
    kid: 'Maya (4)',
    type: 'errand',
    done: true,
  },
  {
    id: '3',
    day: 'Monday',
    time: '04:30 PM',
    title: 'Pickup & Soccer Practice drop-off',
    description: 'Bring cleats, shin guards and water bottle to sports field',
    kid: 'Leo (7)',
    type: 'transport',
    done: false,
  },
  {
    id: '4',
    day: 'Tuesday',
    time: '08:15 AM',
    title: 'Pediatrician routine U-Untersuchung check',
    description: 'Take yellow health booklet & vaccination card',
    kid: 'Noah (1)',
    type: 'health',
    done: false,
  },
  {
    id: '5',
    day: 'Tuesday',
    time: '05:45 PM',
    title: 'Grocery run: Oat milk & breakfast fruit',
    description: "Buy before getting home so wife doesn't have to carry heavy bags",
    kid: 'Household',
    type: 'errand',
    done: false,
  },
  {
    id: '6',
    day: 'Wednesday',
    time: '08:00 AM',
    title: 'Sign school field trip permission slip',
    description: "Leave signed envelope in Leo's backpack zipper pouch",
    kid: 'Leo (7)',
    type: 'school',
    done: false,
  },
  {
    id: '7',
    day: 'Wednesday',
    time: '06:30 PM',
    title: 'Empty recycling & diaper bin',
    description: 'Take out yellow bag and trash without waiting to be asked',
    kid: 'Household',
    type: 'home',
    done: false,
  },
  {
    id: '8',
    day: 'Thursday',
    time: '05:00 PM',
    title: 'Inspect autumn boots & shoe sizes',
    description: "Check if Maya's waterproof boots still fit her feet",
    kid: 'Maya (4)',
    type: 'home',
    done: false,
  },
  {
    id: '9',
    day: 'Friday',
    time: '12:00 PM',
    title: 'Reserve ANOHA or Schwimmhalle weekend ticket',
    description: 'Book time slot online early to prevent weekend sold-out sadness',
    kid: 'Family',
    type: 'event',
    done: false,
  },
  {
    id: '10',
    day: 'Saturday',
    time: '10:00 AM',
    title: 'Grunewald Chestnut Hunt',
    description: 'Pack cloth bags, wet wipes, and thermos with warm tea',
    kid: 'All Kids',
    type: 'outing',
    done: false,
  },
  {
    id: '11',
    day: 'Sunday',
    time: '09:30 AM',
    title: 'Pancake Morning & Bike chain oiling',
    description: 'Let partner sleep in an extra hour while cooking breakfast',
    kid: 'All Kids',
    type: 'morning',
    done: false,
  },
];

const KID_QUESTIONS = [
  {
    id: 'q1',
    ageGroup: 'Toddler (2-5)',
    question: 'If your stuffed animals could talk when we are asleep, what secrets would they tell?',
    context: 'Inspires imaginative storytelling. Laugh with them without correcting logical inconsistencies.',
  },
  {
    id: 'q2',
    ageGroup: 'Toddler (2-5)',
    question: 'What was the funniest noise or face someone made at Kita today?',
    context: "Much easier for young children to recall than an abstract 'How was your day?'",
  },
  {
    id: 'q3',
    ageGroup: 'Elementary (6-9)',
    question: 'If you could trade places with any teacher or classmate for one hour, who would it be and why?',
    context: 'Reveals their social circle dynamics and who they admire or find curious.',
  },
  {
    id: 'q4',
    ageGroup: 'Elementary (6-9)',
    question: 'Was there a moment today where you felt proud, or tried something tricky even if it was hard?',
    context: 'Celebrates effort rather than perfection. Share a small struggle from your own workday too.',
  },
  {
    id: 'q5',
    ageGroup: 'Pre-Teen (10-12+)',
    question: "What's an unwritten rule among your friends that adults don't seem to get?",
    context: 'Respects their emerging autonomy. Listen and validate without lecturing.',
  },
  {
    id: 'q6',
    ageGroup: 'Pre-Teen (10-12+)',
    question: 'What is one thing on your plate this week that feels annoying or stressful?',
    context: "Resist jumping in to solve it immediately. Simply acknowledge: 'That sounds exhausting.'",
  },
];

const SPONTANEOUS_IDEAS = [
  {
    id: 'a1',
    title: 'Couch Hospital (Doctor Dad)',
    energy: 'Ultra-Low (Couch/Floor)',
    duration: '20-40 min',
    prep: 'Blanket, toy doctor kit or bandages',
    description: 'Dad lies flat on the sofa with a mystery illness. The kids are the head physicians who must run scans, apply toy bandages, and prescribe 15 minutes of silent rest.',
  },
  {
    id: 'a2',
    title: 'The Sleeping Giant & Treasure Robbers',
    energy: 'Ultra-Low (Couch/Floor)',
    duration: '20-30 min',
    prep: 'Pillows, 3-4 small toys',
    description: "Dad lies on the carpet pretending to sleep heavily. Place 'treasures' on your back or under pillows. Kids sneak up quietly to retrieve them.",
  },
  {
    id: 'a3',
    title: 'Hallway Ironing Board Car Launch',
    energy: 'Medium',
    duration: '30 min',
    prep: 'Ironing board / ramp + toy cars',
    description: 'Prop one end of the ironing board on the sofa. Hold tournament brackets to see which car rolls the furthest down the hallway floor.',
  },
  {
    id: 'a4',
    title: 'Living Room Floor Is Lava',
    energy: 'Medium',
    duration: '30-45 min',
    prep: 'Throw cushions & blankets',
    description: 'Scatter cushions across the rug. Dad acts as the mission commander calling out volcanic surges while kids leap between islands.',
  },
];

const BERLIN_OUTINGS = [
  {
    id: 'b1',
    name: 'ANOHA – Die Kinderwelt',
    bezirk: 'Kreuzberg',
    setting: 'Indoor',
    age: '2 – 10 years',
    description: 'Gigantic wooden ark structure with dozens of climbable sculptural animals made from recycled materials.',
    tips: 'Admission is free, but you MUST book a time slot ticket online beforehand.',
  },
  {
    id: 'b2',
    name: 'MACHmit! Museum für Kinder',
    bezirk: 'Prenzlauer Berg',
    setting: 'Indoor',
    age: '3 – 12 years',
    description: 'Housed in a converted historic church, featuring a 7-story indoor wooden climbing maze.',
    tips: 'Great for rainy autumn days. Bring non-slip socks.',
  },
  {
    id: 'b3',
    name: 'Harry-Potter-Spielplatz',
    bezirk: 'Neukölln',
    setting: 'Outdoor',
    age: 'All ages',
    description: 'Carved wooden figures: a giant spider, the flying blue car, castles, and slides nestled inside Volkspark Hasenheide.',
    tips: 'Easy to combine with balance bikes or scooters on paved park pathways.',
  },
  {
    id: 'b4',
    name: 'Kastanien Collecting (Grunewald)',
    bezirk: 'Charlottenburg',
    setting: 'Outdoor',
    age: 'All ages',
    description: 'Grab tote bags and head under the horse chestnut and oak trees to collect chestnuts for figurines.',
    tips: 'Start near S-Bahn Grunewald. Bring a thermos of warm tea.',
  },
  {
    id: 'b5',
    name: 'Museum für Naturkunde',
    bezirk: 'Mitte',
    setting: 'Indoor',
    age: '4+ years',
    description: 'Home of the giant Giraffatitan skeleton and real dinosaur fossils.',
    tips: 'Book online tickets to skip the weekend sidewalk queue.',
  },
];

const DAD_HACKS = [
  {
    id: 'h1',
    category: 'Mental Load',
    title: "The 'Closed-Loop' Errand Rule",
    summary: "An errand isn't done when you buy the item; it's done when it's put away in its final spot.",
    detail: 'Bringing groceries into the kitchen is 50%. Putting items in the fridge, folding bags, and tossing cartons closes the loop.',
  },
  {
    id: 'h2',
    category: 'Morning Routines',
    title: 'The 8-Minute Staging Launchpad',
    summary: 'Win the morning by staging before going to sleep.',
    detail: 'Every night before bed: fill water bottles, lay out clothes, and place school bags directly next to the front door shoes.',
  },
  {
    id: 'h3',
    category: 'Emotional Co-Regulation',
    title: 'Get Lower Than The Kid (Eye-Level Rule)',
    summary: 'When a tantrum strikes, physically drop below their eye line.',
    detail: 'Standing over an upset child looks like an oncoming storm. Kneel on the floor so your eyes are below theirs.',
  },
  {
    id: 'h4',
    category: 'Parenting Stamina',
    title: 'The 10-Minute Full-Phone Separation',
    summary: 'Zero-phone time during the 18:00 home arrival transition.',
    detail: 'When walking through the door after work, place your phone on the top shelf for 10 minutes. Greet everyone with open eyes.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const weekDays = getWeekDays();

  const defaultSelectedDay = weekDays.find((d) => d.isToday) || weekDays[1];
  const [selectedDayObj, setSelectedDayObj] = useState(defaultSelectedDay);

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('thedadapp_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TIMELINE_TASKS;
    } catch {
      return DEFAULT_TIMELINE_TASKS;
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskTime, setTaskTime] = useState('08:00 AM');
  const [taskKid, setTaskKid] = useState('Leo (7)');

  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [showListeningGuide, setShowListeningGuide] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(2);

  const [activitiesSubTab, setActivitiesSubTab] = useState('spontaneous');
  const [activityEnergyFilter, setActivityEnergyFilter] = useState('All');

  const [notificationSettings, setNotificationSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('thedadapp_notifications');
      return saved
        ? JSON.parse(saved)
        : {
            dailyTaskDigest: true,
            dailyTaskTime: '07:30',
            kidQuestionAlert: true,
            kidQuestionTime: '18:00',
            dailyDadHack: true,
            dailyDadHackTime: '12:30',
            weekendOutings: true,
            weekendOutingTime: '16:00',
          };
    } catch {
      return {
        dailyTaskDigest: true,
        dailyTaskTime: '07:30',
        kidQuestionAlert: true,
        kidQuestionTime: '18:00',
        dailyDadHack: true,
        dailyDadHackTime: '12:30',
        weekendOutings: true,
        weekendOutingTime: '16:00',
      };
    }
  });

  const [alertFeedback, setAlertFeedback] = useState(null);

  useEffect(() => {
    localStorage.setItem('thedadapp_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('thedadapp_notifications', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      day: selectedDayObj.full,
      time: taskTime,
      title: taskTitle.trim(),
      description: taskDesc.trim() || "Dad task to take off partner's plate",
      kid: taskKid,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDesc('');
    setShowAddModal(false);
  };

  const getTaskIcon = (type, index) => {
    switch (type) {
      case 'morning':
        return <Coffee className="w-5 h-5" />;
      case 'transport':
        return <Car className="w-5 h-5" />;
      case 'errand':
        return <ShoppingBag className="w-5 h-5" />;
      case 'school':
        return <BookOpen className="w-5 h-5" />;
      case 'health':
        return <Activity className="w-5 h-5" />;
      default:
        return index % 2 === 0 ? <Heart className="w-5 h-5" /> : <Home className="w-5 h-5" />;
    }
  };

  const currentDayTasks = tasks.filter(
    (t) => t.day.toLowerCase() === selectedDayObj.full.toLowerCase()
  );

  const hasPendingTasks = (fullDayName) => {
    return tasks.some(
      (t) => t.day.toLowerCase() === fullDayName.toLowerCase() && !t.done
    );
  };

  const testTriggerNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('The Dad App • 18:00 Question', {
        body: KID_QUESTIONS[activeQuestionIndex].question,
      });
      setAlertFeedback('System notification triggered!');
    } else {
      setAlertFeedback('Simulated: 18:00 Kid prompt delivered to screen.');
    }
    setTimeout(() => setAlertFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center font-sans pb-20">
      <div className="w-full max-w-md min-h-screen flex flex-col bg-slate-900 border-x border-slate-800 shadow-2xl">
        <header className="px-5 py-3.5 bg-slate-900/95 backdrop-blur sticky top-0 z-30 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 p-[1.5px] shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-sm font-black text-orange-400">DA</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-sm tracking-tight text-white">The Dad App</h1>
                <span className="text-[10px] bg-slate-800 text-orange-400 px-1.5 py-0.5 rounded-full border border-slate-700/80 font-semibold">
                  Berlin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedDayObj.full} • {currentDayTasks.filter((t) => !t.done).length} to-dos left
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-xl border transition-all ${
              activeTab === 'settings'
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </header>

        {alertFeedback && (
          <div className="mx-4 mt-3 p-3 bg-orange-500/20 border border-orange-500/40 rounded-xl text-xs text-orange-300 flex items-center space-x-2">
            <Bell className="w-4 h-4 shrink-0" />
            <span>{alertFeedback}</span>
          </div>
        )}

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeTab === 'planner' && (
            <div className="space-y-5">
              <div className="bg-slate-950/70 p-3 rounded-3xl border border-slate-800/80 shadow-inner">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {weekDays.map((day) => {
                    const isSelected = selectedDayObj.full === day.full;
                    const hasDot = hasPendingTasks(day.full);

                    return (
                      <button
                        key={day.full}
                        onClick={() => setSelectedDayObj(day)}
                        className="flex flex-col items-center py-1 group focus:outline-none"
                      >
                        <span
                          className={`text-[11px] font-medium transition-colors ${
                            isSelected
                              ? 'text-white font-bold'
                              : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          {day.short}
                        </span>

                        <div className="mt-1.5 flex items-center justify-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                              isSelected
                                ? 'bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-800'
                            }`}
                          >
                            {day.dateNumber}
                          </div>
                        </div>

                        <div className="h-2 flex items-center justify-center mt-1">
                          {hasDot && !isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-sm font-bold text-white">{selectedDayObj.full} Schedule</h2>
                  <p className="text-[11px] text-slate-400">
                    Proactive tasks scheduled for {selectedDayObj.short}, {selectedDayObj.dateNumber}th
                  </p>
                </div>

                <button
                  onClick={() => setShowAddModal(!showAddModal)}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add Task</span>
                </button>
              </div>

              {showAddModal && (
                <form
                  onSubmit={handleAddTask}
                  className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700/80 space-y-2.5"
                >
                  <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                    <span>Add Task for {selectedDayObj.full}</span>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task title..."
                    className="w-full bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    autoFocus
                  />

                  <input
                    type="text"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="Context note..."
                    className="w-full bg-slate-900 border border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-300 placeholder-slate-500 focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={taskTime}
                      onChange={(e) => setTaskTime(e.target.value)}
                      className="bg-slate-900 text-slate-300 border border-slate-700 text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                    >
                      <option value="07:30 AM">07:30 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                    </select>

                    <select
                      value={taskKid}
                      onChange={(e) => setTaskKid(e.target.value)}
                      className="bg-slate-900 text-slate-300 border border-slate-700 text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                    >
                      <option value="Leo (7)">Leo (7)</option>
                      <option value="Maya (4)">Maya (4)</option>
                      <option value="Noah (1)">Noah (1)</option>
                      <option value="All Kids">All Kids</option>
                      <option value="Household">Household</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Save to {selectedDayObj.full}
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {currentDayTasks.length === 0 ? (
                  <div className="py-12 px-6 text-center bg-slate-950/40 rounded-3xl border border-dashed border-slate-800 text-slate-500 text-xs space-y-1">
                    <p className="font-semibold text-slate-400">No tasks logged for {selectedDayObj.full}.</p>
                  </div>
                ) : (
                  currentDayTasks.map((task, idx) => {
                    const theme = CARD_THEMES[idx % CARD_THEMES.length];

                    return (
                      <div key={task.id} className="flex items-start space-x-3 group">
                        <div className="w-16 pt-3 text-right shrink-0">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {task.time}
                          </span>
                        </div>

                        <div
                          className={`flex-1 p-4 rounded-3xl border transition-all ${theme.bg} ${
                            task.done ? 'opacity-55' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1 mr-2">
                              <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-md ${theme.iconBg}`}
                              >
                                {getTaskIcon(task.type, idx)}
                              </div>

                              <div className="space-y-0.5">
                                <h4
                                  className={`text-xs md:text-sm font-bold text-white leading-tight ${
                                    task.done ? 'line-through text-slate-400' : ''
                                  }`}
                                >
                                  {task.title}
                                </h4>

                                <p className="text-[10px] text-slate-400">
                                  {selectedDayObj.short} • {task.time}
                                </p>

                                <p className={`text-xs mt-1.5 leading-relaxed font-normal ${theme.subText}`}>
                                  {task.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end space-y-2 shrink-0">
                              <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                                  task.done
                                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                                    : 'border-slate-600/80 bg-slate-900/80 text-transparent hover:border-slate-400'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3] text-slate-950" />
                              </button>

                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-slate-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-700/30 flex items-center justify-between text-[10px]">
                            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${theme.chip}`}>
                              {task.kid}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {task.done ? 'Done & Handled' : 'Proactive Dad Responsibility'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <div className="bg-slate-850/80 p-4 rounded-3xl border border-slate-800 flex items-start space-x-3.5 shadow-md">
                  <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 tracking-wide">
                      The Proactive Dad Principle
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                      "If you wait for your wife to remind you, she is still carrying the mental burden alone." Check the calendar each morning, anticipate what's empty or due, and handle it quietly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kids' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-950/30 via-slate-800 to-slate-900 p-4 rounded-3xl border border-orange-900/30 relative">
                <div className="flex items-center justify-between text-xs text-orange-400 mb-2">
                  <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>18:00 Dinner Table Starter</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">Today's Question</span>
                </div>

                <h3 className="text-sm md:text-base font-semibold text-white leading-relaxed my-2">
                  "{KID_QUESTIONS[activeQuestionIndex].question}"
                </h3>

                <p className="text-xs text-slate-300 mt-2 p-2.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 leading-normal">
                  <span className="text-orange-300 font-semibold">Dad Note: </span>
                  {KID_QUESTIONS[activeQuestionIndex].context}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex justify-between items-center text-xs">
                  <span className="text-[11px] text-slate-400">
                    Target: {KID_QUESTIONS[activeQuestionIndex].ageGroup}
                  </span>
                  <button
                    onClick={() => setActiveQuestionIndex((prev) => (prev + 1) % KID_QUESTIONS.length)}
                    className="text-orange-400 hover:text-orange-300 font-semibold text-xs flex items-center space-x-1"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Active Listening Guide
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowListeningGuide(!showListeningGuide)}
                    className="text-xs text-orange-400 hover:text-orange-300 font-medium"
                  >
                    {showListeningGuide ? 'Hide' : 'Show Tips'}
                  </button>
                </div>

                {showListeningGuide && (
                  <div className="space-y-2.5 pt-2 border-t border-slate-700/60 text-xs text-slate-300">
                    <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <strong className="text-emerald-400 font-semibold">1. Resist the "Fix-It" Reflex</strong>
                      <p className="text-slate-400 text-[11px]">
                        Don't say: "You should have just told the teacher." Instead: "That sounds frustrating. How did that feel?"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase text-slate-400">Questions By Age</h3>
                  <div className="flex space-x-1">
                    {['All', 'Toddler (2-5)', 'Elementary (6-9)', 'Pre-Teen (10-12+)'].map((age) => (
                      <button
                        key={age}
                        onClick={() => setSelectedAgeGroup(age)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all border ${
                          selectedAgeGroup === age
                            ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                            : 'bg-slate-800 border-slate-800 text-slate-400'
                        }`}
                      >
                        {age === 'All' ? 'All' : age.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {KID_QUESTIONS.filter(
                    (q) => selectedAgeGroup === 'All' || q.ageGroup === selectedAgeGroup
                  ).map((q) => (
                    <div key={q.id} className="p-3.5 bg-slate-800 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-orange-400 font-semibold">{q.ageGroup}</span>
                      <p className="text-xs text-white font-medium">"{q.question}"</p>
                      <p className="text-[11px] text-slate-400">{q.context}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActivitiesSubTab('spontaneous')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                    activitiesSubTab === 'spontaneous'
                      ? 'bg-slate-800 text-orange-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Do Now (Low-Energy Home)
                </button>
                <button
                  onClick={() => setActivitiesSubTab('berlin')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                    activitiesSubTab === 'berlin'
                      ? 'bg-slate-800 text-orange-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Berlin Outings Guide
                </button>
              </div>

              {activitiesSubTab === 'spontaneous' ? (
                <div className="space-y-3">
                  {SPONTANEOUS_IDEAS.map((act) => (
                    <div key={act.id} className="p-4 rounded-3xl bg-slate-800 border border-slate-800 space-y-2">
                      <h4 className="text-sm font-bold text-white">{act.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{act.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {BERLIN_OUTINGS.map((spot) => (
                    <div key={spot.id} className="p-4 rounded-3xl bg-slate-800 border border-slate-800 space-y-2">
                      <h4 className="text-sm font-bold text-white">{spot.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{spot.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'hacks' && (
            <div className="space-y-3">
              {DAD_HACKS.map((hack) => (
                <div key={hack.id} className="p-4 rounded-3xl bg-slate-800 border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {hack.category}
                  </span>
                  <h4 className="text-sm font-bold text-white">{hack.title}</h4>
                  <p className="text-xs font-medium text-orange-200/90 italic">"{hack.summary}"</p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">{hack.detail}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-4 bg-slate-800 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-white">Notifications</h3>
                <button
                  onClick={testTriggerNotification}
                  className="text-[10px] bg-slate-700 hover:bg-slate-600 text-orange-300 px-2 py-1 rounded-lg"
                >
                  Test Alert
                </button>
              </div>
            </div>
          )}
        </main>

        <nav className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 px-3 py-2 flex justify-around items-center z-40">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
              activeTab === 'planner' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('kids')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
              activeTab === 'kids' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Kids Talk</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
              activeTab === 'activities' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Activities</span>
          </button>

          <button
            onClick={() => setActiveTab('hacks')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
              activeTab === 'hacks' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Dad Hacks</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
              activeTab === 'settings' ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}