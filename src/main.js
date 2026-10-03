import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css';

Chart.register(...registerables);
Object.assign(window, { Chart, ChartDataLabels, Swal, XLSX });
import('./app.js');
