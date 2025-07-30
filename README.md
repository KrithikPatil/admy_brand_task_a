
# ADmyBRAND Insights Dashboard

A modern analytics dashboard and reports page for ADmyBRAND Insights, built with Next.js, Tailwind CSS, shadcn/ui, and Recharts. Features advanced charting, export/print, interactive legends, and smooth UI animations.

## Features

- **Dashboard & Reports Pages**: View analytics in a clean, card-based layout.
- **Chart Types**: Line, Bar, Pie, Radar, and Radial Bar charts powered by Recharts.
- **Custom Data Upload**: Upload your own datasets for instant visualization.
- **Interactive Legends**: Draggable legends for radar and radial charts.
- **Export/Print**: Export charts and reports as PDF for sharing or printing.
- **Visual Enhancements**: Modern card design, fade-in animations, and consistent chart dimensions.
- **Responsive Design**: Works across desktop and mobile devices.

## Setup Instructions


### 1. Clone the Repository
```sh
git clone https://github.com/KrithikPatil/admy_brand_task_a.git
cd admy_brand_task_a
```

### Sample Data for Upload
You can use the provided sample JSON file to test the upload feature:

**[Download sample_upload.json](https://drive.google.com/file/d/1Pe7if1Du8L4ToVqaAQG4UbxFGNQRo67K/view?usp=sharing)**

After downloading, use the dashboard's upload button to select and visualize this file.

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Development Server
```sh
npm run dev
```
Visit `http://localhost:3000` in your browser.

### 4. Build for Production
```sh
npm run build
npm start
```

## Project Structure
- `src/components/CustomCharts.tsx` — Main chart component with chart picker, legend, and export features.
- `src/components/ui/card.tsx` — Card UI component.
- `src/components/DraggableLegend.tsx` — Interactive legend for radar/radial charts.
- `src/data/mockRadarData.json` — Demo data for radar chart.
- `src/data/mockRadialData.json` — Demo data for radial bar chart.

## Customization
- **Add new chart types**: Extend `CustomCharts.tsx`.
- **Change theme/colors**: Edit Tailwind config or `COLORS` array in chart components.
- **Upload your own data**: Use the upload feature on the dashboard.

## Dependencies
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [framer-motion](https://www.framer.com/motion/)

## License
MIT

---
For questions or support, contact the repository owner.
