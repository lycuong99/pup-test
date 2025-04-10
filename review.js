import { chunkArray, cleanSensitiveWords, extractJsonString, handleCommentText } from "./utils.js";
import { callAI } from "./callAI.js";

let comments = [
  "Đẻ comment tại đây tịnh tâm tu luyện trong tháng này độ phá Hợp Thể",
  "Góc tìm truyện manhwa về 1 main loser không hiểu ý gái vô tình nhặt được cặp kính có thể nhìn thấy độ hảo cảm và 4 hội thoại có thể chọn để tăng hảo cảm như trong game Visual Novel.",
  "Siêu phẩm",
  "Comanhua App Đọc Truyện Free Ra Chap Mới Cực Nhanh Đặc Biệt Ko Cắt Chap. Truyện Gì Cũng Có Đầy Đủ Thể Loại manhua manhwa, Kho Truyện Khủng, Chất Lượng Cực Nét. Mn Lên App Store Hoặc CH Play Để Tải App Nhé",
  "góc tìm truyện: truyện của trung quốc main kiếp trước là bậc thầy tu luyện gì đấy (ko nhớ rõ) thì sang kiếp này bị chuyển sinh ở thế giới nơi coi phụ nữ là đàn ông, đàn ông là phụ nữ.main thành 1 thằng béo rồi về sau có đệ là con chuột tóc bạc. Có một cô tóc đen với một cô tóc bạc xuất hiện đầu truyện. Ai biết thì tui rất cảm ơn",
  'Mn ơi dù đọc hết truyện r mà h t vẫn k hiểu "điêu thuyền" trong mấy câu nói đùa giữa 2 ae ninh yến từ cựu cho lắm\nNghèo Nó khinh HTA lúc đầu tưởng nho gia thích gọi j thì gọi hiện ra luônai ngờ phải tu vi cao chưa kể còn phản phệ -> joke để kích từ cực tu luyện nhanh lên còn summon điêu thuyền cho t',
  "Kkk truyện hay vầy ma có mấy con giời moi đọc chê này chê nọ",
  "Đại phụng đá bát canh",
  "Nói thật chứ, tác giả viết truyện thế này thì không thích truyện này rồi đó.",
  "Cmn gần 200 chap main rác quá,con vk kia thích main muốn đc chuộc thân,main coi ẻm là bạn chịch\nfragile Btinh bạn ơi phù hương chỉ là cái xác thoiii có gì đâu mà quạo\nfragile sau nghe tin phù hương bệnh sắp ngỏmmang tiền đến chuộc này là cái xác mà đuôi của cửu vĩ nhập vào thôi",
  "Có tu tiên ko các đạo hữu ơi\nNước ép dưa hấu Về sau\nHieumoiden Tuvi cao ko bro\nHieumoiden Sau có đổi ngoại hình lần nào k\nNước ép dưa hấu Bộ này tu võ, nhưng khá mạnh mà nhỉ\nThốn hửi lìch mình thích tu tiên. bro có con nào hay giới thiệu với",
  "check tvi",
  "Nuốt trôi đc k mn\nfragile Đọc được bạn ơi,đọc xong cái não suy nghĩ ngư conan luôn :)",
  "Ae có by bộ nào mà nữ chính xuyên không 1000 lần để cứu nam chính Ko\nĐắcĐạoThànhTiên HỒI QUY 1000Lần Ta hồi sinh nam chính thế giới chủ\nĐắcĐạoThànhTiên HỒI QUY 1000Lần Ta hồi sinh nam chính thế giới chủ\nĐắcĐạoThànhTiên HỒI QUY 1000Lần Ta hồi sinh nam chính thế giới chủ\nuniverse Cảm ơn đạo hữu\nuniverse Truyện đọc ở đâu v bro\nuniverse Không tìm thấy truyện a",
  "MN cho mik hỏi kết truyện như nào v a",
  "100đ để đọc chap sớm nhất, nma đợi 1 ngày thì bên này vẫn up leak đc, ngày xưa bên app có trước 3-4 tập thì đáng để nạp vào đọc, giờ bọn app cập nhật chậm vcl ra, đọc free cho đỡ tốn",
  "Cày bộ này để độ kiếpppppp",
  ".",
  "có cách nào báo cáo bọn rác rưởi đi spam hết truyện này đến truyện khác ko mấy ní, mẹ chap éo nào bọn nó củng spam cho mấy trang",
  "ko biết truyện tranh làm như nào chứ nếu như truyện chữ thì uổng bộ truyện này quá, ending ncct\ntao Thôi thì võ thần hứa thất an :v",
  "Tại hạ đã ngao du khắp thiên hạ, giờ ta chỉ còn một chút hơi tàn nên ta xin truyền lại cuốn mật tịch nàyABP092, ABS130, ABS141, ABS170, ABS217, ABS047, ABS070, ABS074, ABS083, ADN032, AKB056, AMBI048, AOZ173z, AOZ189z, AOZ212z, AOZ217z, AP154, AP081, APAA151, APAA246, APAA258, APAA272, APAA280, APAA299, APAK074, APAK078, APAK086, APAK088, ARM383, ARM416, ARMF003, ATID157, ATID207, ATOM093, AUKG276, AUKG293, AUKG045, AVOP109, AVOP155, AVOP159, AVOP002, BAMS001, BDSR185, BDSR202, BGN018, BGN005, BKSP274, BRA007, BUG012, CCCV001, CHN035, CLUB196, CMV049, CND128, CND129, CND142, CND089, CRIM035, CRS046, CUT002, CWM221, DAJ075, DANDY289, DANDY368, DANDY440, DASD267, DDT469, DDT482, DFE020, DISM001, DIY030, DMOW098, DOM021,DOM043, DOPP035, DPHN142, DV1175,DV1246, DVDES659, DVDES734, DVDES804, DVDES818, DVDES832, DVDES836, DVDES878, DVLL010, DWI01, EBOD249, EBOD338, EBOD405, EBOD416, EDD191, EMRD058, EQ059, EXD048, FAJS035, FAX306, FAX428, FSET249, FSET264, FSET294, FSET320, FSET321, FSET323, FSET324, FSET421, FSET553, GASO0012, GASO0013, GDTM044, GDTM054, GDTM078, GENT060, GENT075, GEXP91, GEXP93, GG106, GG132, GG177, GG228, GIRO92, GKI012, GSHRB037, GSHRB046, GVG106, GVG135, GVG158, GVG067, GVRD05, HAVD596, HAVD830, HAVD837, HBAD141, HBAD260, HBAD267, HDI001, HED002, HELL102, HERR024, HERR029, HERX025, HERX029,HND110, HND132, HND138, HND186, HNDS024, HNDS024, HODV20467, HODV20978, HODV20986, HODV20993, HODV21002, HODV21027, HODV21062, HRRB003, HUNT852, HUNT913, HUNT946, HUNT971, HUNT999, HUNTA018, HUNTA025, HUNTA032, HUNTA006,IBW312, IBW356, IBW363, IBW372, IBW475z, IBW476z, IBW483z, IBW495z, IBW506z, IBW508z, IBW518z, IDOL018, IEND002, IENE101, IENE112, IENE114, IENE159, IENE160, IENE386, IENE406, IENE412, IENE431, IESP104, IESP114, IESP418, IESP458, INU027, IPTD587, IPTD619, IPTD694, IPTD813, IPTD949, IPZ140, IPZ187, IPZ204, IPZ210, IPZ226, IPZ228, IPZ235, IPZ257, IPZ281, IPZ306, IPZ331, IPZ344, IPZ368, IPZ040, IPZ478, JOHS005, JUC112, JUC368, JUC398, JUC419, JUC944, JUMP2210, JUMP2312, JUX298, JUX360, JUX500, KAWD596, KAWD608, KAWD629, KAWD640, KAWD651, KISD082, KK054, KRND020, KRND027, KRND029, KRND031, KTDS726, KTDS769, KTDS774, LLR005, LLR008, LOL089, LOL091, LOVE90, MAS052, MDTM001, MDTM013, MDTM027, MDTM029, MDYD732, MDYD785, MDYD811, MDYD881, MIAD488, MIAD573, MIAD730, MIAD767, MIDD678, MIDE113, MIDE123, MIDE243, MIDE007, MIGD590, MIGD594, MIGD613, MIGD625, MIGD639, MIGD654, MILD863, MIMK023, MIRD139, MIST045, MMND104, MNG93, MOC004, MOMJ017, MSK006, MSTT002, MUKD192, MUKD335, MUM001, MUM105, MUM109, MUM110, MUM113, MUM114, MUM119, MUM126, MUM130, MUM132, MUM135, MUM143, MUM144, MUM165, MUM168, MU169, MUM172, MUM173, MUM174, MUM019, MUM067, MUM007,Alice shokugeki no soma180663203497237556Megumi shokugeki no soma117327147676166412Aqua173911218917195287316277306950323026Uzaki-chan297346276023304002Asuna Yuuki319893316198322874Hinata Hyuga316242318326306672310481Rem314259312354300508288873189632289276178283Mitsuha Miyamizu256038185333191532186151Eromanga Sensei240912239436193941Kamado Nezuko319115306954283001Kanroji love pillar310502321881303578Fujiwara Chika276478267858270370278513 photo onlyKaguya Shinomiya270251267979265175silent voice ko nhớ tên215660Zero Two260606308637254496Code t nhặt đc:255308, 211648, 278153, 269542, 273447, 147746, 271062, 179267 (Tuyệt vời ông mặt trời), 171091 (Cũng tuyệt), 206409, 220901, 92807, 86879, 92056, 148080, 223146, 199827, 271048, 253993, 268793, 266987, 277677, 268920, 239463, 253993, 186780 (Ấm lòng nhưng có xúc tu), 209775, 129071, 285275, 284566, 255772, 280890, 168479, 262711, 265918.Cơ bản: 275485, 269673, 103269, 241790, 281709, 255869, 89514, 152067, 97730, 285504, 255662 (Hay), 204958 (Cũng hay), 250647 (Cũng được), 222798, 260605, 226861, 245503, 264298, 223147, 67462, 255744, 245737, 170727, 272298, 246448, 179687, 187343, 245131, 123361, 272129, 129281, 217727 (Rám nắng), 178468, 155365 (Gái tàu và Hitler), 274917, 280297, 261063, 228708, 285588, 16316, 214054, 240543, 233321, 203367, 233878, 245942, 246144, 242056, 253992 (Hay), 283737, 283101, 210010, 118282.Vãi l*n mức độ trung bình: 249743, 280509, 151436, 109851, 60449, 195117, 281135, 276528, 179305 (Nguồn gốc Mega Milk), 243520, 272768, 151165, 182290, 175852, 234167, 218398, 277324, 245135, 267300, 286003, 221287 (Cái kết kinh hoàng, nhưng mở đầu bình thường), 285627, 116513, 182674, 260217, 245341, 218162, 149414, 283036, 112940, 269285, 191773, 248670,167466 165684 254048 175015 174016 142825 129128 171417 129128 95809 239567 247021 46579 123580 171417 173543 197422 187835 217832 206573 169546 193107 190805 220309 211112 132768 97945 164783 206446 251608 90182 256018 138470 110826 175494 134764 145647 212562 179166 214784 176977 191434 191434 239536 236342 227702 204425 205079 85333 254935 232837 232385 232341 254087 50535 235202 94159 52365 255034 153045 159457 173235 96270 196020 191774 230332 95298 89514 73649 203027 217404 65573 255457 199874 233133 205367 233693 50046 234191 209455 206366 253799 39249 172197 243552 223998221050 217456 225019 234165 258245 247696 258212 258465 86493 258133 244327 260640 261171 244996 202634 165950 220967 120977 204746 142850 99439 232439 246032 200948 265804 25913 262861 196077155489 257528 267270 177044 267502 184840144714 228575 268002 267980 227439 267980268015 89502 228575 220893 160609 261107 110747 235532 248196 228948 259361 235032 139512 257528 260369 261650 234174 116174 239732 213835 146913 216227 182290 117013 259600 139512 258479 173101 235532 258488 264551 263661 242668 154884 150096 265842 259137 781573 234734 244436 265841 265837 255337 110955 265842 266301 928040 122557 135420 209519 265756 136489 242517 266965 134035 266613 183469 244996 255662 267352 208797 267270 267043 213560 261868 267352 186938 267369 263516 266942 111292 233513 262069 172807 263960 184840 266495 252548 267617 193770 262668 225918 147759 154290 240108 240110 208486 240113 242586 257960 109168 109395 109519 112206 231215 246186 267980 259491 265933 196016 235032 228948 131056 121927 134861 195791 116300 268362 152889 134500 268338 220735 192060 113276 265526 264824 126784 191851 103366 229144 158651 257484 248696 265804 206387 158123 136188 235928 194941 208797 241819 239732 215376 220212 165957 266906 228922 268529 267352270447 143034 203250 270796 248879 237210111257 234642 271920 197780 259837 110813 93335 157478 226208 172132 274458 274826228626 275085 177013,255308, 211648, 278153, 269542, 273447, 147746, 271062, 179267 , 171091 , 206409, 220901, 92807, 86879, 92056, 148080, 223146, 199827, 271048, 253993, 268793, 266987, 277677, 268920, 239463, 253993, 186780 , 209775, 129071, 285275, 284566, 255772, 280890, 168479, 262711, 265918. Cơ bản: 275485, 269673, 103269, 241790, 281709, 255869, 89514, 152067, 97730, 285504, 255662 , 204958 , 250647 , 222798, 260605, 226861, 245503, 264298, 223147, 67462, 255744, 245737, 170727, 272298, 246448, 179687, 187343, 245131, 123361, 272129, 129281, 217727 , 178468, 155365 , 274917, 280297, 261063, 228708, 285588, 16316, 214054, 240543, 233321, 203367, 233878, 245942, 246144, 242056, 253992 , 283737, 283101, 210010, 118282. 249743, 280509, 151436, 109851, 60449, 195117, 281135, 276528, 179305 , 243520, 272768, 151165, 182290, 175852, 234167, 218398, 277324, 245135, 267300, 286003, 221287 , 285627, 116513, 182674, 260217, 245341, 218162, 149414, 283036, 112940, 269285, 191773, 248670. Đáng sợ: 278832, 210510, 77054, 177013, 255918, 114750, 139732, 222855, 261174, 201704, 4280, 215600 177013 , 228922 , 142440 36590 71710 248618 186139 63675 10002 210268 241043 170027 220041 193448 213624 42460 241296 93008 72953 60624 35634 43525 183414 84531 80199 221306 56185 13176 166411 185184 11350 78525 180027 164869 43742 84686 166817 15543 208626 34270 116759 249525 384059 167635 154089 245473 257867\nEmilia -tan Vừa gặp ông bên bộ hộ vệ\nEmilia -tan Ngao du cmm coppy\nEmilia -tan Ngao du cmm coppy",
  "Main cưới nhị công chúa chap bm\nGojo Satoru còn lâu",
  "Main cưới nhị công chúa chap bm",
  "Các vị đạo hữu đọc truyện chữ rồi cho tại hạ hỏi, với tiến độ này thì khoảng bao nhiêu chap nữa thì end\nMeo Cũng phải vài năm, chưa được nửa truyện\nMeo Theo đà này tầm 3 4 năm nữa á đạo hữu ☝\nQ Chap mơi nhất là chấp bnhieu truyện chữ bản dịch vậy :))\nQ  Con tôi nó hỏi sao bố thuchs đọc truyện thế\nQ tôi nhớ ko nhầm thì rơi vào khoảng 600 mấy đó\nMeo tầm 830-840 đấy bác",
  "Ở truyện này mọi người đều có thể hồi sinh bằng một loại hình học kỳ lạ vad đừng trước nó gọi tên ngày tháng năm sinh thì sẽ đc hồi sinh",
  "phải đổi ng khác vd chu kỳ trc mình là ng tra tấn thì lần này mình là người bị tra tấn đến chu kỳ thứ hai main gặp đc ng tên Lý Tu từ đó mà thoát đc ngục lên trạm không gian",
  "Tìm truyện main sau khi xuyên không sang thế giới tu tiên thì 50 năm sau được hồi sinh nhưng lại ở trong một nhà ngục , ở trong này phải luân phiên theo chu kỳ tra tấn nha và sau mỗi chu kỳ",
  "Tìm truyện main sau khi xuyên không sang thế giới tu tiên thì 50 năm sau được hồi sinh nhưng lại ở trong một nhà ngục , ở trong này phải luân phiên theo chu kỳ tra tấn nha và sau mỗi chu kỳ",
  ".",
  "Truyện đến đoạn song tu với quốc sư nhắc mình với .tích chap rhoi",
  "Truyện đến đoạn sông tự với quốc sư thì ai nhắc mình với ạ .tích chap thô",
  "này thuộc thể loại tu tiên hay sao mn\nDương Khai tu võ thôi\nnew bie Thực ra về sau thì gọi là tu tiên được rồi, định thay cả thiên đạo luôn mà",
  "J",
  "Hsheh",
  "Đọc truyện tranh chờ lâu quá chuyển qua truyện chữ đọc cuốn vai ae à k phải mòn mỏi chờ",
  ".",
  "Check",
  "Check tuvi",
  '"Thiên hạ phi nhất nhân chi thiên hạ, nãi thiên hạ chi thiên hạ dã" trích lã thị xuân thu của lã bất vi',
  "Sau này main mấy vợ thế m.n\nMaI Chi Hình như 1 vợ là Lâm An còn lại là tình nhân, Lạc Ngọc Hành, Hoài Khánh, Chung Ly, Chư Thải Vi, Dạ Cơ, Mộ Nam Chi\nVan Nam Phù hương thì sao bro\nNguyễn Bình À, Phù Huơng bỏ lớp thân phận cũ và chuyển sang thân phận thật có tên Dạ Cơ ấy\nVan Nam Oh ok\nVan Nam Oh ok\nVan Nam 2 đứa đệ tử giám chính ko tính, trong hồ cá hải vương nhưng còn chưa tới giai đoạn mập mờ\nBạn nữ giấu trym Thì tại 2 đứa chưa biết yêu, ngây thơ vậy dính vào main hỏng người =))",
  "Mn ơi, mình đang tìm truyện: main có thể xuyên giữa 2 thế giới, 1 thế giới hiện đại 1 thế giới tu tiên, thế giới hiện đại bị tận thế kiểu có zombie rồi quái vật, tui nhớ là ở thế giới hiện đại main có đồng đội là 1 zombie có khả năng giống thuận phong nhĩ, 1 người máy AI và 1 thằng là chủ của tổ chức sát thủ\nQ Chư giới tận thế online",
  "Test",
  "479 là chap bn truyện chữ v mn\nsfegdfbg 550>570",
  "truyện hay nhưng end để lại nhiều câu hỏi lắm mong truyện tranh giải đáp hết\nspoiler Đọc ở wed nào bro\nÁC QUỶ TƯ BẢN Đọc ở đạo quán cũng được, đã dịch full",
  "Này xem hết phim live action thì tới chqp mấy v ae\nkẻ vuive Phim như shit nên là đọc lại từ đầu đi\nHUY đọc được vài trang truyện cứ ra vẻ thượng đẳng :))))\nkẻ vuive cứ đọc chap mới nhất nhé, truyện chậm hơn phim đấy :D\nQ Wtf?? Thì phim hơi khác nên t kih đọc lại để hiểu hơn thôi , thượng đẳng cái moẹ gì đây\nQ T xem cx thấy phim chán\nQ Phim nó dở ẹc chứ có sai đâu mà thượng với đẳng\nQ Phim nó dở ẹc chứ có sai đâu mà thượng với đẳng\nHUY Tệ lắm hả bro\nNguyễn Bình Hơi khác truyện gốc, bro xem thử sẽ biết\nQ Nhưng phim chán thật",
  "Mn ơi , T đang tìm bộ truyện Nhân vật chính có gia thế rất mạnh , bà nội được phong hầu nhưng do vết thương nên về hưu và rất thương nhân vật chính và cả giòng họ cũng vậy . Nhà main có nhận 1 cô bé nuôi và sau này lớn lên bố Main mới nói cho Main biết và sau này 2 người lấy nhauSau khi quáu vật liên tiếp tấn công lãnh thổ loài người thì càng thu hẹp , và thành lập tổng bộ liên minh và Main được người cao nhất trong liên minh nhận làm đồ đệ và hỗ trợ Main về sau 2 vợ chồng Main cũng đk phong hầu và quản lý 1 vùng rộng lớn T tìm mãi mà không nhớ Tên Truyện mong mn giúp tks\nShakura\nDâm tặc lão tổ Đạo hữu tu tiên tới đâu r mà màu sắc nổi bật thếTại hạ kẹt mãi ở đỉnh phong không biết khi nào mới độ kiếp\nBiu Mập Tại hạ cũng vậy\nShakura hóng\nShakura ké với khi nào tìm được bạn hú mình được không bạn\nShakura ké bạn ơi khi nào có truyên hú mình\nĐạp Thiên Đọc free như T thì 1 năm lên 1 tầng\nTrảm Phong Ối zồi ôi",
  "... ... .\\\\:::::|”~,/-,|:::::::|: : : : ¯”~,-,,,-~”:::,,-'\\::::::::\\-,,_::|/... ... ..',\\,::|~--'-~\\:::::::|: : : : : : |::|,,-~”¯..__\\::::::::\\... .'|... ..,~”': : \\|: : : : : \\::::::|: : : : : : |¯”'~~”~,”,: : \\:::::::|.. /..,-“: : : : : :|: : : : : :\\::::::|: : : : : : \\: : : : : : “~'-,:\\::::::|\\,.|: : : : : : : |: : : : : : |::::|,\\,: : : : : : : : : : : : : :”-,-\\::::|: \\| : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :”-'\\,,..\\: : : : : : : : : : :'\\: : : : : : : : : : : : : :~,,: : : : : : : : : “~-.,_...\\ : : : : : : : : : : :\\: /: : : : : : : : : : : : : : : “,: : : : : : : : : : :\"~,_... .\\: : : : : : : : : : :\\|: : : : : : : : :_._ : : : : : : \\: : : : : : : : : : : : :”- .... ...\\: : : : : : : : : : \\: : : : : : : : ( O ) : : : : : : \\: : : : : : : : : : : : : : '\\._... ... .\\ : : : : : : : : : '\\': : : : : : : :\"*\": : : : : : : :|: : : : : : : : : : : : : : : |0)... ... ...\\ : : : : : : : : : '\\: : : : : : : : : : : : : : : :/: : : : : : : : : : : : : : : /\"\"... ... .....\\ : : : : : : : : : \\: : : : : : : : : : : : : ,-“: : : : : : : : : : : : : : : :/... ... ... ...\\ : : : : : : : : : \\: : : : : : : : : _=\" : : : : : ',_.: : : : : : : :,-“... ... ... ... \\,: : : : : : : : : \\: :\"”'~---~”\" : : : : : : : : : : : : = :\"”~... ... ... ... ..'\\,: : : : : : : : : \\: : : : : : : : : : : : : : : : : : : '|: : \\... ... ... ... ... .\\, : : : : : : : : '\\: : : : : : : : : : : : : : : : : : :|: : '\\... ... ... ... ... ...\\,: : : : : : : : : : : : : : : : : : : : : : : : : |: : :\\... ... ... ... ... ... ..\\ : : : : : : : : \\: : : : : : : : : : : : : : : : :|: : : :\\... ... ... ... ... ... ...\\\\,: : : : : : : :\\, : : : : : : : : : : : : : : :/: : : : :\\... ... ... ... ... ... ... .\\\\ : : : : : : : :'\\ : : : : : : : : : : : : : :|: : : : : '|... ... ... ... ... ... ... ./:\\: : : : : : : : :'\\, : :;: : : : : :;: : : : |: : : : : :|... ... ... ... ... ... ... /: : \\: : : : : : : : : '\\,:;: : : : : :;: : : : |: : : : : :|... ... ... ... ... ... .../: : : '\\: : : : : : : : : :'\\,: : : : : :; : : : :|: : : : : : |... ... ... ... ... ... ../: : : : :\\: : : : : : : : : : :\\, : : : ;: : : : : |: : : : : /: |... ... ... ... ... ... ,/: : : : : : :\\: : : : : : : : : : '\\,:.. :: : : : : : |: : : :;:: |... ... ... ... ... ..,-“: : : : : : : :“-,: : : : : : : : : : \\*, : : : : : : : : :\\: |... ... ... ... ... ,/ : : : : : : : : : :”-, : : : : : : : : : :\\: : : : : /: : : : : : /... ... ... ... ..,/ : : : : : : : : : : : : :”-, : : : : : : : : :'\\: : : : : : : : ,/... ... ... ... ,/ : : : : : : : : : : : : : : : ;-,: : : : : : : : :'\\: : |: : : : : : /... ... ... .../: : : : : : : : : : : : : : : : :;: “-,: : : : : : : : '\\: |: : : : : /... ... ... ../: : : : : : : : : : : : : : : : : : : : :“-,: : : : : : : \\,|: : : : :/... ... ... ,/: : : : : : : : : : : : : : : : : : : : : : :“-,: : : : : : :\\: : : : /... ... .../-,-,”,,-,~-,,_: : : : : : : : : : : : : : : : : “-,: : : : : :'\\: : :'|... ... ...|'....:..:...: : : “'~,,~~---,,,_: : : : : : : : '\\: : : : : :\\,: :|... ... ..|: :”: ..: :”: : : : : : :”-,........ ¯¯”''~~~-~..\\: : : : : : \\:|... ... ..|: : : ..: : : : : : : : : : :”-,........................: : : : : : : \\|... ... ..| : : : : : : : : : : : : : : : :”-,......................: : : : : : : :\\,... ... ..| : : : : : : : : : : : : : : : :”-,..........\\..........: : : : : : : : '\\... ... ..| : : : : : : : : : : : : : : : : : :”-......|.......,..: : :\\: : : : : : :\\... ... ..| : : : : : : : : : : : : : : : : : : : ,.....|.....,..: : : : '\\: : : : : : ||... ... ..| : : : : : : : : : : : : : : : : : : : : \\.../.....,/: : : : ,-~/: : ,: |: /:|... ... ..'|: : : : : : : : : : : : : : : : : : : : : ”¯: : : : : :|: ::|: :/::/:\nqiqi nice bro\nqiqi mông lép thế bro\nqiqi ... ... .\\\\:::::|”~,/-,|:::::::|: : : : ¯”~,-,,,-~”:::,,-'\\::::::::\\-,,_::|/... ... ..',\\,::|~--'-~\\:::::::|: : : : : : |::|,,-~”¯..__\\::::::::\\... .'|... ..,~”': : \\|: : : : : \\::::::|: : : : : : |¯”'~~”~,”,: : \\:::::::|.. /..,-“: : : : : :|: : : : : :\\::::::|: : : : : : \\: : : : : : “~'-,:\\::::::|\\,.|: : : : : : : |: : : : : : |::::|,\\,: : : : : : : : : : : : : :”-,-\\::::|: \\| : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :”-'\\,,..\\: : : : : : : : : : :'\\: : : : : : : : : : : : : :~,,: : : : : : : : : “~-.,_...\\ : : : : : : : : : : :\\: /: : : : : : : : : : : : : : : “,: : : : : : : : : : :\"~,_... .\\: : : : : : : : : : :\\|: : : : : : : : :_._ : : : : : : \\: : : : : : : : : : : : :”- .... ...\\: : : : : : : : : : \\: : : : : : : : ( O ) : : : : : : \\: : : : : : : : : : : : : : '\\._... ... .\\ : : : : : : : : : '\\': : : : : : : :\"*\": : : : : : : :|: : : : : : : : : : : : : : : |0)... ... ...\\ : : : : : : : : : '\\: : : : : : : : : : : : : : : :/: : : : : : : : : : : : : : : /\"\"... ... .....\\ : : : : : : : : : \\: : : : : : : : : : : : : ,-“: : : : : : : : : : : : : : : :/... ... ... ...\\ : : : : : : : : : \\: : : : : : : : : _=\" : : : : : ',_.: : : : : : : :,-“... ... ... ... \\,: : : : : : : : : \\: :\"”'~---~”\" : : : : : : : : : : : : = :\"”~... ... ... ... ..'\\,: : : : : : : : : \\: : : : : : : : : : : : : : : : : : : '|: : \\... ... ... ... ... .\\, : : : : : : : : '\\: : : : : : : : : : : : : : : : : : :|: : '\\... ... ... ... ... ...\\,: : : : : : : : : : : : : : : : : : : : : : : : : |: : :\\... ... ... ... ... ... ..\\ : : : : : : : : \\: : : : : : : : : : : : : : : : :|: : : :\\... ... ... ... ... ... ...\\\\,: : : : : : : :\\, : : : : : : : : : : : : : : :/: : : : :\\... ... ... ... ... ... ... .\\\\ : : : : : : : :'\\ : : : : : : : : : : : : : :|: : : : : '|... ... ... ... ... ... .... ./:\\: : : : : : : : :'\\, : :;: : : : : :;: : : : |: : : : : :|... ... ... ... ... ... .... /: : \\: : : : : : : : : '\\,:;: : : : : :;: : : : |: : : : : :|... ... ... ... ... ... ..../: : : '\\: : : : : : : : : :'\\,: : : : : :; : : : :|: : : : : : |... ... ... ... ... ......./: : : : :\\: : : : : : : : : : :\\, : : : ;: : : : |: : : : : /: |... ... ... ... ... ... ,/: : : : : : :\\: : : : : : : : : : '\\,:.. :: : : :  |: : : :;:: |... ... ... ... ... ..,-“: : : : : : : :“-,: : : : : : : : : : \\*, : : : : : : : :\\: |... ... ... ... ... ,/ : : : : : : : : : :”-, : : : : : : : : : :\\: : : :  /: : : : : : /... ... ... ......,/ : : : : : : : : : : : : :”-, : : : : : : : : :'\\: : : : : : : : ,/... ... ... ... ,/ : : : : : : : : : : : : : : : ;-,: : : : : : : : :'\\: : |: : : : : : /... ... ... ../: : : : : : : : : : : : : : : : :;: “-,: : : : : : : : '\\: |: : : : : /... ... ... ./: : : : : : : : : : : : : : : : : : : : :“-,: : : : : : : \\,|: : : : :/... ... ...,/: : : : : : : : : : : : : : : : : : : : : : :“-,: : : : : : :\\: : : : /... ... ../-,-,”,,-,~-,,_: : : : : : : : : : : : : : : : : “-,: : : : : :'\\: : :'|... ..../'....:..:...: : : “'~,,~~---,,,_: : : : : : : : '\\: : : : : :\\,: :|... .. /: :”: ..: :”: : : : : : :”-,........ ¯¯”''~~~-~..\\: : : : : : \\:|... ...|: : : ..: : : : : : : : : : :”-,........................: : : : : : : \\|... ..| : : : : : : : : : : : : : : : :”-,......................: : : : : : : :\\,... ..| : : : : : : : : : : : : : : : :”-,..........\\..........: : : : : : : : '\\... ..| : : : : : : : : : : : : : : : : : :”-......|.......,..: : :\\: : : : : : :\\... ..| : : : : : : : : : : : : : : : : : : : ,.....|.....,..: : : : '\\: : : : : : ||... ..| : : : : : : : : : : : : : : : : : : : : \\.../.....,/: : : : ,-~/: : ,: |: /:|... ... |: : : : : : : : : : : : : : : : : : : : : ”¯: : : : : :|: ::|: :/::/: sửa lại nè",
  "Truyện hay thí",
  "Phim tập 24 là chap bn đấy ae\nTô thiên dương Vcl có cả phim r á\nAdu Phim người đóng mới chất\nAdu Đr\nAdu T bh mới biết luôn ấy chứMà có ấySearch tên truyện rs phimEnd rồi mà t thấy tập 40 nó cứ ngơ ngơ chắc có p2\nTô thiên dương Phim như shit nên là đọc lại từ đầu đi",
  "Skibidi tôi lết bòm bòm",
  "Chuyển thể thành phim cái hết ra truyện nữa luôn à",
  "Cho hỏi main có bnhieu vk thế mn biết tên kể hộ luôn càng tốt\nBEN X chỉ cưới 1 vợ thôi, nhưng mà vương phi, quốc sư, trưởng công chúa(sau làm hoàng đế) ông ăn hết\nBEN X có 1 tỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷỷ",
  "Có 463 từ hôm qua rùi mà web chưa có, lâu vậy\nZero ra luôn chap 464 luôn r đó đạo hữu :))\nVô Địch Thiên Hạ Đọc hôm kia luôn rùi, chap 464 ấy",
  "chap này bằng cháp bao nhiêu truyện chữ vây mọi người",
  "Tóm tắt truyện với 3 từ main tra án, não to, fuck boy chính hiệu",
  "e",
  "Tìm truyện có main bị mù , tu luyện cái võ công gì liên quan tới cá sấu ấy , còn nội dung thì không nhớ rõ lăm",
  "Ae cho hỏi bộ main mấy vợ thế",
  "Truyện này ko hay đâu khuyên cáo ae đừng lên đọc nhé",
  "...",
  "Từ chap 100 nhảy lên chap 450 check thử mà sao vẫn là ngân la zậy , thế này bao giờ mới lên dc kim la\nhung Ngân la mà đ cần thần thù , nếu solo 11 với tứ phẩm thì đủ giết r , có thần thù thì 3 phẩm đánh chết vẫn đc v còn chê\nhung danh hiệu được người ta gọi thôi sau này vẫn gọi là ngân la hứa thất an",
  "ADU BÃO CHAP",
  "Đây là bộ truyện xuất sắc nhất mà t từng đọc",
  "1 cân 5 ez lừa trọc",
  "cho xin tên mấy mấy bộ truyện cx kiểu như này đi các đạo hữu",
  "Quảng cáo nhiều vãi lòn",
  "web này ra chap cx tương đôi nhanhbên trung ra chap 452 ngày sau bên này dịch xong r",
  "Đạo hữu nào đọc full truyện chữ r cho tại hạ hỏi main đã thit nhưng em nào z ạ\nVô Địch Thiên Hạ tầm này của truyện thì ms chơi em Phù Hương, người tiếp theo bị chơi là Quốc sư, sau đó là Vương phi. Xong vương phi rồi thì là một em tộc trưởng Cổ tộc, rồi đến nhị công chúa. Cuối cùng là đệ nhất công chúa. Em thánh nữ mấy lần trong truyện cx thấy có ghen, có tcam nhất định nma cuối cùng ko thịt thì hết truyện, 2 em ở bên Ti thiên giám cũng ko đụng chạm j nốt. Nch a chỉ chơi hàng tuyển thôi, hàng xinh bthg là a ko chơi. Người mà đạo tàn bụ nhiều nhất chắc chỉ có vương phi với quốc sư tranh chức, có thời điểm lịch trình của nó là sáng cắm hoa, chiều vờn ngọc, tối dạy đánh vần với nhị công chúa (Hoa ý chỉ vương phi, sau này sẽ hiểu tại sao, ngọc thì quốc sư)\nLê ty đạo hữu",
  "tui vừa đọc xong truyện chữ hôm nay ae ạ. Cảm xúc thì vl mà đọc lâu nên ko có cmt. Kết truyện có hơi hụt hẫng chút, ko biết có ngoại truyện ko nhỉ?\nLê Kết sao rứa bạn\nLê Có ngoại truyện đấy, mà mấy ông dịch chỉ dịch 1 nữa thôi cay vãi. Ngoại truyện là đi dự tiệc trong cung\nCá chà bá ở đâu thế ông. T xin web với\nLê Tìm là ra\nKane Kết lên làm bảo vệ. Lấy ba tong đi gõ từng thằng siêu phẩm xong đi phượt :))))\nKane Kết lên làm bảo vệ. Lấy ba tong đi gõ từng thằng siêu phẩm xong đi phượt :))))\nTạc thiên bang Vãi =))",
  "Các đạo hữu cho em hỏi, bản truyện tranh thì main thịt những ai rồi vậy ạ\nKhổng Tước Hiện tại vẫn là Phù Hương\nKhổng Tước Chưa ai hết nhé, nhỏ kia cho main nằm mộng thôi chứ chưa đc sờ mó cái gì đâu\nQ Q vậy bao chap nữa mới đc thịt em nào thế bro\nsting còn lâu lắm, phải đợi main nó vip hơn 1 tý thì quốc sư mới tìm được nó.",
  "Tìm truyện main bị dịch chuyển sang thế giới khác câu người cá làm vợ\nNo one https://truyenqqto.com/truyen-tranh/isekai-de-tochi-o-katte-noujou-o-tsukurou-7483 đây\nMaCaQuy thank",
  "Đọc vì ae đông mà qc quá thôi qua bên kia đọc cho r (truyenqq bỏ qq thay gg)\nKỳ vuong Dai de Vậy là đạo hữu không tải chrome rồi\nỐc Xanh Lam Tôi chủ đạo xài gg chorm mà có mấy ông kêu tôi xài coccoc để chặn qc mà nói chứ đọc truyện là dùng dt đọc giải trí hoy chứ quằn nhiều thứ quá nên lười hì hì",
  "Xin list cảnh giới bên truyện này cái phân chia nhiều loại quá h đọc ko bt so sánh thế nào\nPhoenix Wright Võ phu / Thuật sỉ / Vu thần giảo /Phật / Nhân - Đạo - Địa Tông / Nho giáo . Tất cả đều đc nho thánh phân chia từ 9 phẩm -> 1 phầm\nPhoenix Wright cứ cửu phẩm -> nhất phẩm -> nửa bước siêu phàm -> Thần/Thánh. Có nhiều hệ khác nhau, tất cả đều có thần, trừ Võ thần.\nLê Có mõm thần ko b\nLê Có mõm thần ko b\nHieumoiden Mõm thần là nho thánh đấy chứ ai =)))). Chém gió thành sự thật, khắc chế cứng của vu thần giáo, phật giáo. M xài spell gì, t chém gió thành đéo xài đc spell là xong.",
  "S ko có bình luận nào v",
  "S ko có bình luận nào v",
  "xin",
  "Tìm truyện main bị dịch chuyển sang thế giới khác câu người cá làm vợ",
  "Tìm truyện: truyện  khựa, đại khái là kiểu chia phe con ng với dị tộc. Đầu truyện main đánh với con quái nào đấy có 2 đầu, 1 đầu rắn, 1 đầu cá sấu hsao ấy.... 1 chi tiết khác là có 1 ông tiền bối kiểu cảm tử giết quái vượt cấp, xong phải đi canh giữ suối sinh mệnh để cầm cự sự sống. Sức mạnh của main có cái j mà đi vào 1 thế giới toàn là lửa, kiểu kiếm trận hsao.. huhu mn giúp với\nÁi boku no pico 2\nÁi Nghe lạ vãi tôi cũng tò mò\nhaiza Đù má..\nÁi Có name hú tôi nhé\nÁi Có name hú tôi nhé\nSussy cat Mạt thế quật khởi",
  "Lại bú đá r",
  "9",
  "Ss",
  "Cài hơn 400c từ 81% lên đc 85%\nĐục Thuyền Cày lòi c\nDitmechungmay 500 chương truyện 5% cày thêm 1500c nữa\nĐục Thuyền Anh bạn đc bnh k điểm rồi\nDitmechungmay 85% h ko lẻ cài lại bộ võ luyện đĩnh phong 3700c\nĐục Thuyền Cố đi\nĐục Thuyền Ít mà sao đâu\nĐục Thuyền uk bộ đó nhiêu chap mà chap cx ngăn cày nhanh thôi tâm 3 day đôi vs tại hạ ây mà =)\nVô Địch Thiên Hạ Ko có thời gian gảnh cở đc 2h đọc truyện thui\nĐục Thuyền Dùng Tiny Task mà treo cày còn mún tải Tiny Task ở đâu thì lên gg nhé :))",
  "Wed khốn nạn đến cái nút tắt QC cũng vứt mẹ rồi\nLăng Hư Tải brave về mà đọc\nLăng Hư Đọc bên cốc cốc ấy",
  "truyện như bìu nhé mn. cắt chap lỗi chap mất chap nhìu lắm",
  "có hậu cung k mn\nchildrenhunter Main phịch thủ nhé\nNhóc nguyễn chơi cả quốc sư thì phải hiểu như nào, lại con chơi cả quốc sư trong trạng thái nhân cách khác nhau.",
  "Hay\nNguyễn Huy main có nhiều vợ ko ông\nChuối Chx biết đc. Nhưng chắc là có\nChuối main có 1 vợ và 5 tiểu tam chính thức =))\nThủ thế khỏi đọc, c.ơn bro",
  "Anh em cho viết tu vi trên web phần tu tiên đc ko nhỉ",
  "o_0",
  "Review đọc hơn 400 chap: Để so sánh cho dễ hiểu thì giống conan nhưng phiên bản trung vậy tình tiết bẻ lái khá hay, main não to nhưng hay simp gái, ko buff quá mạnh nhưng biết dùng não để ra vẻ ngầu lòi, nói chung bánh cuốn",
  "cái j vậy trời",
  "qua truyenqqto đọc free không quảng cáo ae, web nhanh mượt",
  "ai đồng hương 17 thái bình nào\nđẹp zai nhất xóm T nhé\nđẹp zai nhất xóm T nhé",
  'Truyện cuốn và quan trọng là đọc k "khó chịu" nha ae. Vì thể loại trinh thám nên hạn chế đọc cmt nha, lũ "vật" tương đối nhiều',
  'Các đạo hữu cho mình tìm truyện manhua (cũng không chắc có phải manhua không nữa nhưng mà của trung quốc), nội dung thì nói về 1 đứa trẻ, ngày xưa mẹ nó là sư muội ở phái Côn Luân được sư huynh yêu, sư huynh tên là Phong Lôi hay Lôi Phong gì đó, tuy nhiên mẹ nó lại yêu người ở phía ma giáo. Phía ma giáo thì có 1 vài ông mạnh, đại diện bởi các con linh thú. người mẹ nó yêu, cũng là bố nó, biểu trưng bởi Phượng Hoàng. Mình nhớ khi đứa con được sinh ra đúng lúc phái Côn Luân đang có đại chiến, nó được bọc trong vỏ đá, sau đó vỡ ra, thì được sư phụ của mẹ nuôi và dạy dỗ, sau đó tặng cho các bảo pháp, trong đó có kính chiếu yêu. Sau này nó trở lại thành người đứng đầu ma giáo. MÌnh đọc lâu lắm rồi, từ 10-15 năm trước, lúc ấy đọc ở dạng quyển, truyện này có 9-10-11 tập gì đó, mình mới được đọc từ tập 1 đến 6, tập 7 có tên là "Phượng Hoàng chiến Lôi Phong" là bố nó đánh nhau với sư huynh của mẹ.',
  "Truyện này phần truyện chữ có ngoại truyện không vậy,thấy có ông cmt bảo có mà không thấy\nHiệp Sĩ Vô Danh Tìm tên truyện + ngoại truyện là ra. Nhưng cũng chả có gì nhiều",
  "Mn người muốn đọc sớm vs ko qc ra truyenqqto mà đọc chứ web này h làm ăn chán đ tả nổi r",
  "Riết rồi web này làm ăn như cc,chèn quảng cáo lấy kinh phí duy trì cho cả đống vào, rồi đi ăn cắp truyện của web khác up lên như quần què, thiếu chap tum lum đã zay còn đ sửa,clmn\nRead to Level up trung bình web nào chả thế chả ăn cắp truyện, đọc free đc rồi còn đòi này nọi, giỏi thì nuôi ngta đi để ko có quảng cáo",
  "Riết rồi web này làm ăn như cc,chèn quảng cáo lấy kinh phí duy trì cho cả đống vào, rồi đi ăn cắp truyện của web khác up lên như quần què, thiếu chap tum lum đã zay còn đ sửa,clmn",
  "Mn ra toptruyen mà đọc nhé ko bị lỗi chap đâu bên đến cx nhiều truyện trung có gì định cư luôn chứ qq cx sắp đến ngày tàn rồi\nSussy cat OK nhed bác\nSussy cat Độ kiếp là ngang Kuro chưa bác\nLăng Hư Kuro vẫn hơn tôi 1 cấp",
  "Bình thường",
  "Wed sucsinh sáng ra bị uot tk đăng nhập lại thì bảo sai mk yêu cầu cấp mã đổi mk thì lỗi bay cày acc cày cuốc bao năm sập cbmmmm đi",
  'Có truyện mà main cũng xuyên vào ngay chiến trường nhưng là đánh nhau với người, main ch*t nhiều lần nhưng đều có 1 đứa con gái cần đại kiếm thì phảiMn có biết là truyện gì koRút Gọn\nQ Nghe miêu tả của bạn thấy giống phim "Cuộc chiến luân hồi" của Tom Cruise vậy\nK K Thật',
  "mới coi bên kia đến 407\nQ bên nào z",
  "Web này coi như hỏng triệt để rồi. Quảng cáo tham lam vô độ, truyện thì đóe cập nhật. Đần hết sức, phải có người xem thì bọn m mới có tiền duy trì web chứ. Nhét càng nhiều quảng cáo, truyện ko cập nhật thì người xem chuyển web khác là hiển nhiên thôi.\nRhadames bạn chuyển sang máy tính như tui nè đọc đi=))) (à mà tui xài Cốc Cốc)\nRhadames Chap đ có mà cx đăng xong r lỗi ảnh tùm lum mà đ chịu sửa\nRhadames Tải cốc cốc đi\nLolicon chặn quảng cáo là một chuyện, vấn đề là éo có cập nhật truyện ấy\nRhadames Bên discord của ad truyenqq có nói web đã bán và lập web mới rồi, nên mới xuất hiện nhiều qc vậy",
  "Chap này tầm chương bao nhiu trong truyện chữ v mng",
  "Còn lạc ngọc hành ko phải nữ nhân của main\nXT Đạo Lữ thôi không phải nữ nhân của main :)))",
  "Về sau phù hương mấtBuồn vcl\nXT Nghe đâu vẫn sống mà bro\nXT Phù hương là 1 trong những phân thân của yêu hồ ( yêu vương hay yêu tháng gì đó) . Giả bệnh chết để về yêu tộc phục mệnh thôi . Về sau happy ending",
  "Đệ tử giám chính:6: đần+ham ăn5: sao chổi4: vô nhân đạo3: bức vương + chúa hề2: trẻ đao1: lừa thầy phản bạn\nBạch Nhật Quang Toàn tuyệt thế ko:)))",
  "ANH EM CHO TÔI XIN RECOMMEND MẤY BỘ MANHWA HAY HOẶC MANHUA KHÔNG CÓ TRONG LIST DƯỚI , MANHUA ĐỌC HẾT RỒI KHÔNG THẤY BỘ NÀO HAY NỮA.tiện thể recommend theo quan điểm của tôi một vài bộ đã đọc:* mấy bộ về não :- ta là tà đế : cmt này là bài tôi up trong group fb ta là tà đế 20k mem, có thể gặp người quen, nói ngắn gọn thì bộ này là top 1 truyện đối với tôi từ cốt truyện cho đến art, combat .......- ngự linh thế giới (art ban đầu bình thường về sau thì đẹp, não thằng nào cũng to, main mạnh, cùng tác giả bộ tà đế nên khỏi nghi ngờ)- chàng rể mạnh nhất lịch sử (thiên về đấu trí, não chắc phải hàng top manhua, xem vả mặt sướng, não to quá nên main không biết đánh nhau mãi về sau đọc chuyện chữ main mới có sức mạnh )- vạn cổ chí tôn (main não to nhưng nhân vật phụ bình thường, mấy chap đầu thì hơi chán nhưng kiên nhẫn chút vì về sau hay và art combat các thứ lại siêu phẩm vl, vẽ đẹp ác, một phần thu hút của bộ này là do art, cốt truyện thì tùy người cảm nhận)- đại phụng đả canh nhân (motip phá án dàn nhân vật não cũng ok, art ổn nhưng do thiên về phá án nên combat vẽ không được chú trọng)- đại quản gia là ma hoàng (art bình thường những não to, nhiều người chê mà cũng nhiều người khen)- ta là đại thần tiên (não ok nhưng art tạm tạm nhưng thỉnh thoảng có mấy đoạn hơi vô lí tại main chỉ là 1 thằng nhóc thiên tài 7 8 tuổi gì đấy trong thân xác người lớn nhưng vẫn chấp nhận được)- túy kiếm dạ hành (bộ này được vl, main sát phạt quyết đoán, có não, art chất vl, mỗi tội ra chap hơi chậm)(xếp từ trên xuống dưới về độ hay theo cảm nhận của tôi có giá trị đọc lại nhiều)còn mấy bộ khác cũng có não mà không bằng ở trên:- ta trời sinh phản diện.(cũng gọi là có não mà đọc dần về sau thấy hơi nhàm vì não quá thành nghiêng về một phía nv phụ bị neft quá mức, có thể sau này sẽ hay hơn vì thấy nhiều người khen do tôi chưa đọc truyện chữ nên hiện tại thấy bình thường)- chưởng môn khiêm tốn chút (nghe tên là hiểu, main bá)- đại chu tiên lại (kiểu như bản cấp thấp của bộ đại phụng đả canh nhân từ art cho đến não)- phàm nhân tu tiên (bộ đầu tiên và duy nhất tôi đọc hết chuyện chữ, art đẹp)- thiên đạo đồ thư quan (có não, đọc chill chill khá hài hước, end ss1 rồi)- toàn cầu băng phong (đọc tu tiên chém nhau nhiều rồi nên tự nhiên gặp bộ mạt thế nên thấy hay hay lạ lạ, mạt thế hở phát là bị giết cướp thức ăn nên main cũng thuộc dạng khôn vl ko dễ tin người vì chết một lần rồi vì cái tội simp gái)- mấy bộ manhwa cho ae chán tu tiên (AE RECOMMEND CHO TÔI MẤY BỘ MANHWA HAY VỚI):- solo leveling (bộ này nổi chắc nhiều ae biết, có anime)- bắc kiếm giang hồ (chém nhau phê vl, bối cảnh giang hồ thấy khá hay)- con trai út của gia tộc kiếm thuật (tùy ae cảm nhận, bối cảnh, kiếm sĩ với pháp sư)- ngã lão ma thần (tôi thấy hay, main khá giống bộ túy kiếm dạ hành)- lookism (đánh đấm thông thường mà cuốn vl nhưng phải sau 200 chap đầu, qua được 200 chap đầu thì sẽ thấy ko dứt ra được, có anime) .- god of high school (ban đầu có mấy thằng học sinh đánh nhau thôi mượn sức mạnh của thần về sau thành một đống tôn ngộ không, phật tổ, chúa, satan, thor ..... đủ thể loại, đã end 570 chap và có cả anime)mấy bộ main mạnh vl nên ko cần não cũng được:đại tượng vô hình, đồ đệ ta là trùm phản diện, đỉnh cấp khí vận, tử linh pháp sư, tu luyện thành tiên nuôi nữ đồ đệ, từ lúc bắt đầu liền vô địch, hoa sơn tái xuất, tinh giáp hồn tướng, tuyệt đối cảm kiếm.\nLevanminh Cảm ơn, rất hữu ích đối với người mới như toi\nLevanminh thank bro.nhờ ông mà tôi bt thêm vài bộ để đọc\nLevanminh đang muốn tìm những bộ kiểu ta là tà đế mà chx bt may có ông recommend cho\nLevanminh Bạn đọc thử :Đệ nhất danh sáchYêu thần ký Tinh giáp hàn tướng\nLevanminh manhwa có the bearker siêu phẩm ss1-2 mà ít ai biết nhỉ\nLevanminh Yêu thần ký,ma vương tha mạng , cổ chân nhân ,Mệnh danh nghệ thuật bóng tối ,Manhwa:Toàn tri đọc giả ( Cốt truyện độc lạ ko đụng hàng ai , não thì ai cx có , và có rất nhiều sự liên hệ với các chòm sao với thàn thoại hy lạp\nLevanminh Tu tiên mà k có cổ chân nhân là dở r\nLevanminh À có bộ Mạnh nhất lịch sử hay hơn nhiều bãi rác người vs thần của nhật bổn\nLevanminh À đọc bộ tâm ma chưa cx mới đc ng ta rec cuốn nhưng đau não vl",
  "Sao mất mẹ lịch sử chap đang đọc rồi",
  "Moẹ,374 375 đ fix luôn",
  "Anh em vào truyenqqto.com mà đọc truyện đến 395 từ lâu rồi\nVô danh Web bên đó ổn k đó,hay lại lâu lâu lại đổi tên web làm mất hết đánh dấu truyện nữa\nRead to Level up Web đọc ổn lắm bạn. Chỉ có điểm trừ là bên đó bình luận ít lắm ko xôm bằng bên này, nên đôi khi muốn thảo luận hay hỏi cái gì cũng ko đc\nKo Có xem qua rồi, khá ổn web đẹp, nhưng mà có vẻ như mới mở hay sao ấy,tại web mới up có mấy bộ truyện manga,manhua với manhwa đang hot hiện giờ thôi, còn mấy bộ hay mà chưa end chỉ vì ra lâu của mấy năm trước k có,t phải về lại đây coi, với lại bên đó có vài truyện đặt tên khác làm kiếm k ra như bộ Bậc thầy thiết kế điền trang,qua đó nó tên gì ấy,k nhìn cái bìa có khuôn mặt thằng Lloyd mém cũng bỏ qua rồi\nVô danh Wifi nhà nào mà bị bóp băng thông đọc trên fast thì xác định là mất hình, cơ mà công nhận bên đấy có mấy bộ up nhanh thật",
  "Thiếu chap 387 r",
  "Cuối cùng cụng ra hơi lâu",
  "bão ae ơi",
  "Bão chap",
  'Haiz lâi v đọ xong bên kia r nhìn lại bên này nản wuas\nphuc kejzuta Đọc ở đâu v bạn\nMèo Ngáo net truyen có nhiều loại net truyen aa ,....đặc biệt có mấy cái net có 18+ thì sẽ trộm đc nhiều truyện hơn vd "nett*****die"không khuyễn kích vào đề phồng ấn nhâm vao 18+',
  "J thế này vậy tr",
  "web dead r à ae",
  "Đổi web hết đi ae ơi:) web khác hơn 390 mịa r\nBơi Suốt ngày phải chuyển nhà, quá ư là mệt đi\nAn Lạc Chỉ Tui ko chuyển mà tìm thêm web đọc,qq có bộ ra chậm cũng có bộ ra bth mà dù hơi vl ở chỗ web khác ra đến 390 r mà qq mới 375\nBơi 395 rồi cơ\nBơi Tôi không chỉ chuyển nhà mà chuyển luôn thành dân truyện chữ\nĐờ ra Gôn\nChu Tước Ma Tức",
  "Lỗi 2 chap mới 1 tuần r còn chx sửa, làm ăn chán vc",
  "Chắc dọn nhà qua ne t truyen ll thôi",
  "Có web nào đọc bộ này khong bị lỗi 2 chap mới khong ạ\nConac G5 đó ô, bên đó còn ra trc nx cơ\nZenith Trên app hả ông\nConac Đr ô nếu kh thích thì qua web fast scan dịch hơn 290, t cx định ở đó luôn mà kh thích tại có mấy bộ thích ko có, dịch có bộ chậm. Nên ở tạm đây trc bên nào cx như nhau đc bộ này lại mất bộ kia\nConac Nhầm 390\nZenith Oke, cảm ơn ông nhiều nhá.",
  "Đọc cuốn thật",
  "sửa coi ad, chôn chôn",
  "Ae có web nào kh web này chậm quá\nZenith Nghe các đồng môn net mà quá đây kh ổn tí nào\nZenith Trước ổn mà tự dưng mới gần đây bất ổn đấy\nRin Web này bị như bên net r ô",
  "lỗi chap vẫn k định fix à",
  "qc đánh bài k tắt đc che hết 1/3 màn hình rồi còn nhảy trang ! Truyện đăng thì lỗi ...",
  "ae qua truyenqqto nhá. Bao mượt, giao diện đẹp, ko QC\ntruyện xàm lol ít truyện và toàn truyền hàn chim bé",
  "Ad làm ăn như cc r nhá, càng ngày càng cẩu thả, qc chèn 1 hai lần thì thôi đi, đây chap nào cũng hiện",
  "Quảng cáo nhiều v\nMồn Lèo tải app cốc cốc về xem bro",
  "Lỗi nhiều thế nhỉ",
  "lỗi chap",
  "Cũng ok",
  "Cho hỏi sau 400 chap main đang ở cảnh giới nào vậy t mới đọc tới chap 100",
  "top những cách nhận biết truyện haytop 1: đọc cmt có đạo hữu tìm chap sang truyện chữ\nMephisto Kiến thức đã được tiếp thu\nMephisto ko hiệu quả lắm",
  "hay không",
  'Đọc xong 2098 chấp truyện chữ :)), đạo hữu nào có gì muốn biết thì hỏi t trả lời cho\nKẻ Ngốc Có Ý Chí đố ông khứa võ thần này mấy vợ á\nH Vợ trên danh phận là Lâm An, còn nhân tình nó xơi hết Ngọc Hành, Nam Chi, Dạ Cơ, Hoài Khánh.Tôn kính nhất là Ngọc HànhYêu nhất là Nam ChiThương nhất là Lâm AnCòn chiều chuộng nó nhất là Dạ CơT đọc hết thật mà bác :))\nH Bị cái bộ này kết như đb, từ đầu tới cuối ok hết cái kết lãng xẹt\nKẻ Ngốc Có Ý Chí ghe ghe\nKẻ Ngốc Có Ý Chí tại ông tác giả viết ra cái đại kiếp còn có 6 tháng, tự làm khó mình\nKẻ Ngốc Có Ý Chí dạo hữu viết rõ cả họ nữa thì đẹp\nKẻ Ngốc Có Ý Chí Kết như thế n v a...\nVon ca lai Kết là main lên võ thần, giết hết mấy thần khác nha\nVon ca lai Kết nó k hay bởi nó khai thác chưa tới đã kết, đẩy tốc độ quá nhanh và quản trọng là kết k thoả mãn\nKẻ Ngốc Có Ý Chí kết như nào hả bác\nKẻ Ngốc Có Ý Chí Nam Chi dự đoán tầm bao nhiêu chap mới xuất hiện v bác\nKẻ Ngốc Có Ý Chí còn phần phiên ngoại( hậu truyện), nữa đấy. Kết vậy là ổn rồi, dù sao ao cá toàn bà la sát, không ai chịu làm vợ bé thì đành vậy thôi.\nFB I Khó nói bác, bác phải đọc mới thấy nó k thoả mãn, t k biết giải thích như nào :))\nLmao lmao Tôi nhớ trên truyện tranh có rồi đó, chap nào ngồi nch với quốc sư đấy\nQ Q Ngoại truyện cũng k thoả mãn bác :)), t cần biết triều đại sau đó như nào rồi cuộc sống về sau như nào, chứ ngoại truyện nó chỉ giải thích sau cuộc chiến thôi :)))\nKẻ Ngốc Có Ý Chí Top 1 mỹ nhân ấy hả mà có chồng r mà nhỉ\nLmao lmao chồng nhưng chưa làm ăn đc j\nThạch\nLmao lmao Chồng trên danh nghĩa thôi, chưa có đụng vô, để dành cho mục đích tấn thăng, mới đụng vô. đọc truyện chữ, mới thấy, plot hơi bị đỉnh đấy.\nQ Cuối cùng main húp tấn thăng nhất phẩm :)\nKẻ Ngốc Có Ý Chí Nói đúng nè,rõ bộ truyện làm tình tiết rất hay,nhưng kết là chưa trọn vẹn luôn á thiếu đủ thứ\nKẻ Ngốc Có Ý Chí Gặp đồng chí rồi a,đọc ngoại truyện cứ tưởng nó thiếu cuối cùng chỉ nhận đc có 3 chap ngoại truyện mà nó thiếu vài cái kết luôn á,như Ngụy Uyên với Hoàng Hầu,ở đất nước vạn yêu quốc ra sao ko đề cập tới luôn,còn vài cái nữa làm bản thân khó chịu vãi\nKẻ Ngốc Có Ý Chí Sau arc Trấn Bắc Vương còn arc nào hay không. Đọc thấy còn nhiều nản quá\nKẻ Ngốc Có Ý Chí Ông cho tôi hỏi e Chung Ly về sau còn liên quan gì tới main kh\nPhan K bác ơi, về sau ít đất diễn lắm với cũng k là gì của main cả. Cả 2 bước qua đời nhau như những người bạn :))\nKẻ Ngốc Có Ý Chí Quả ending truyện chữ là đi với Nam Chi du lịch giang hồ đấy là sao v,tại có thoại "bỏ thê tử,chưa có con" ấy là troll th đkh hay đi với nam chi luôn v\nNb Troll á, ý là đi với Nam Chi như đi chơi thôi, r cũng về, còn chưa có con là thật',
  "truyện tranh khác truyện chữ nhiều ko guys -.- nếu ko thì từ 370 đọc chương bao nhiêu vậy\nMa Vô Hối của bạn nè: https://bachngocsach.com.vn/reader/dai-phung-da-canh-nhan-convert/ubdl\nMa Vô Hối Mình đọc xong truyện chữ ruj , lời thoại tới giờ y chang truyện chữ ah ko khác mấy\nMa Vô Hối đọc truyện chữ ông cười sảng luôn\nBạch ma mấy khúc joke bị giảm bớt so vs truyện chữ, hơi tiếc\nMa Vô Hối 370 = tầm chap 565 566 j đó k nhớ .đọc truyện chữ hay hơn .mỗi tội mấy đoạn đánh chém nhau k = truyện tranh .nhưng có nh diễn biến nội tâm nhân vật hơn",
  "vừa bị ăn chửi xong đọc truyện cho đỡ buồn đây\nkhoai lắc đang đọc bị mất điện thì =)))",
  "chap 369 thì đọc truyện chữ đoạn nào v các bác",
  "Nghe bảo sắp chuyển thể thành phim người đóng nhưng nhìn diễn viên mặt có vẻ ko hợp ninh yến\nBắc Kì tán nhân chuyển animation còn được chứ người đóng nghe nó cứ sao sao\nBắc Kì tán nhân trong truyện thì còn harem dc chứ lên phim thì chỉ có only one\nBắc Kì tán nhân Có từ tháng 5 rồi, hình như điền hi vi đóng vợ cả, nhớ mỗi thế :))",
  "Đợi 2 ngày nữa là cày đã",
  "Có truyện nào hay như này nữa k ae\nKodatdcten ké\nKodatdcten Ké\nu y Khánh Dư Niên, Ta là Tà Đế, Trời sinh nhân vật phản diện, Tinh Hồn Giáp TướngBộ Khánh Dư Niên Cx nói về lịch sử giống Đại Phụng, có phim luôn rồi. Ko như Đại Phụng chỉ bên Weibo mới xem đc (bên trung).\nu y Khánh Dư Niên, Ta là Tà Đế, Trời sinh nhân vật phản diện, Tinh Hồn Giáp TướngBộ Khánh Dư Niên Cx nói về lịch sử giống Đại Phụng, có phim luôn rồi. Ko như Đại Phụng chỉ bên Weibo mới xem đc (bên trung).\nChín Quả Khánh Dư Niên, Ta là Tà Đế, Trời sinh nhân vật phản diện, Tinh Hồn Giáp TướngBộ Khánh Dư Niên Cx nói về lịch sử giống Đại Phụng, có phim luôn rồi. Ko như Đại Phụng chỉ bên Weibo mới xem đc (bên trung).\nAlal t đọc truyện với xem phim khánh dư niên thấy khác nhau quá, không biết truyện chữ sao\nu y Phim thường chuyển thể từ tiểu thuyết hơn là truyện (dựa theo), truyện thì phải cắt bớt hoặc thêm vài nội dung sao cho phù hợp, phim cũng thế. Nói chung truyện khác phim là bình thường, phim khác tiểu thuyết là bình thường, và ngược lại :)\nAlal Nói thật bộ KDN t thik mỗi cái tranh kinh thành đẹp vcl,còn lại nd khá là chán, cái gì nó cũng nữa vời khá thất vọng\nChân Tiểu Nhân Có lẽ xem phim OK hơn đó bạn\nChân Tiểu Nhân Có lẽ xem phim OK hơn đó bạn\nKodatdcten cường giả đến từ trại tâm thần\nKodatdcten Đại chu tiên lạiTrước có ông cấp 9 giới thiệu t, đọc cũng giống giống bộ này ( bộ này 10 bộ đó chắc 7)\nKẻ Ngốc Có Ý Chí bộ này lúc mở cổng sang tg khác là bị nhạt r",
  "YouTube lên chap 377 r mà đây mãi ko thấy",
  ":)",
  'Đợi lâu quá nên vô cày truyện chữ hết luôn :))) main tấn thăng võ thần cũng cực khổ lắm tuy được ông giám chính mở đường cho hết nhưng cũng dựa vào tư duy với sức mạnh thằng main mới lên được, kết đẹp nhưng giám chính, kim liên, triệu thủ chết tuy ông giám chính thì k hẳn là chết chỉ về lại thân thể ban đầu là thiên đạo thôi\nĐạo Tôn 13:12-T6-21/6/2024 end bộ .      _Đại Phụng Đả Canh Nhân_Kết cuối cùng " Đi câu lan nghe khúc"\nHọc Sinh Ngoan :))\nĐạo Tôn Về sau tấn thăng thuận lợi quá đâm ra bị nhạt ấy...với lại main nửa bước võ thần r nhóm thiên địa hội vẫn lẹt đẹt tứ phẩm..có mỗi tula với đạo trưởng mèo nhị phẩm đâm ra main ôm hết cảm giác bọn kia phế ác..\nNawngs Giúp được đoạn hắc liên thôi còn lại phế toàn tập\nNawngs đại kiếp tới nhanh quá ấy chứ, nếu ko trừ số 4 ra thì lên siêu phàm chỉ cần vài năm( thiên tư cực phẩm chứ ko phải main)',
  "vừa đọc xong truyện chữ, nội dung phải nói là hay và cuốn, main não to và càng ngày càng mạnh, vợ cả Lâm An, tuy vợ cả nhưng t thấy ngang hàng mộ nam chi, phù hương(dạ cơ), lạc ngọc hành, hoài khánh( hoài khánh song tu 1 lần còn mấy bà kia thì song tu rất nhiều =)), còn lại là hồng nhanh tri kĩ",
  "/",
  "Raw tới 381 rồi",
  "Võ Phu / Yêu TộcI - Phàm Nhân:Luyện Tinh Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLuyện Khí Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLuyện Thần Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnĐồng Bì Thiết Cốt Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnHóa Kình Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnÝ Cảnh / Thiên Phú Thần Thông Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Bất Diệt Chi Khu Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnHợp Đạo Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnNhất Phẩm Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnVõ Thần Cảnh / Yêu Thần Cảnh  Nho GiaI - Phàm Nhân:Khai Khiếu Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnTu Thân Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnNhân Giả Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnNho Sinh Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnĐức Hành Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnQuân Tử Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Lập Mệnh Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnĐại Nho Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnÁ Thánh Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnNho Thánh Cảnh  Thuật SĩI - Phàm Nhân:Y Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnVọng Khí Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnPhong Thủy Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLuyện Kim Thuật Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnDự Ngôn Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnTrận Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Thiên Cơ Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLuyện Khí Sĩ Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnThiên Mệnh Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnSiêu Phẩm Cảnh  Vu SưI - Phàm Nhân:Huyết Linh Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnChú Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLinh Môi Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnQuái Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnChúc Tế Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnMộng Vu Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Linh Tuệ Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnVũ Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnĐại Vu sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnVu Thần Cảnh  Phật MônI - Phàm Nhân:Sa Di Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnVõ Tăng Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnPháp Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnThiền Sư Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLuật Giả Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnKhổ Hành Tăng Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Kim Cương Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLa Hán Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnBồ Tát Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnPhật Đà Cảnh  Đạo MônI - Phàm Nhân:Trúc Cơ Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnKhai Quang Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnThực Khí Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnÂm Thần Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnKim Đan Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnNguyên Anh Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Dương Thần Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnĐộ Kiếp Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnLục Địa Thần Tiên Cảnh: Tiểu Thành --- Đại Thành --- Đại Viên MãnĐạo Tôn Cảnh  Cổ SưI - Phàm Nhân:Nhất Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnNhị Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnTam Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnTứ Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnNgũ Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnLục Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnII - Siêu Phàm:Thất Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnBát Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnCửu Giai Đoạn: Tiểu Thành --- Đại Thành --- Đại Viên MãnCổ Thần Cảnh",
  "Nếu bạn đọc bình luận này thì bố mẹ bạn sẽ chết trong vòng 5năm. Để tránh điều này thì bạn phải copy và gửi nó vào năm truyện. Thành thật xin lỗi tui đọc đc nên phải gửi\nđfe Xàm lòon v ba\nđfe Đánh chết con mẹ m giờ",
  "mình tưởng Thái Vi là vợ main nhưng nghe nhiều anh em bảo là lâm an là sao vậy\nThần Có Lâm An cưới hỏi đàng hoàng thôi hồng nhan thì là Vương Phi , quốc sư, trg công chúa, dạ cơ , cửu vĩ hồ nhớ sơ sơ là vậy\nVô Danh ko có thái vi à\nThần Thải vi , hứa linh âm , số 5 3 thùng cơm ns làm gì :)\nVô Danh 5 3 thùng cơm là sao\nThần Số 5 thiên địa hội Lệ Na cơ bản ns ở đây 3 người là ăn nhiều lên ảnh dễ dính đến việc ăn",
  "Bộ này đọc kết ức chế lắm\nChí Thanh Kết sao vậy bro\nĐêm nay Ko ngủ Main nói yêu tùm lum cuối cùng lấy dc mỗi e lâm an,trưởng công chúa làm hoàng đế song tu với quốc sư.hết.\nChí Thanh hoàng đế song tu với quốc sư chap nào vậy\nTử Thần Ko ý ông ấy là trưởng công chúa hoài khánh làm nữ đế ấy chứ còn main song tu với quốc sư th\nQ vậy main là j\nTử Thần Chỉ là qua đường mấy e kia ai về nhà nấy xây quê hương\nTử Thần Thì thằng main k lấy quốc sư thì nó song tu với đứa khác thôi\nChí Thanh Ý ông là sao ko biết nma quốc sư song tu vs main cơ bản có 2 lý do:1. Là có cảm tình vs main nên có thể nói lần đầu tạm chấp nhận đc rồi tiến xa hơn2. Main có khí vận đủ để khi song tu có thể trung hòa nghiệt hỏa , rồi lấy đó là cơ sở để bước lên cảnh giới nhất phẩm lục địa thần tiên ( đây chắc cũng là 1 lý do lớn nhất )\nVô Danh Chuẩn cmnl, t đọc kết cũng ức chế vl, lãng xẹt",
  "main về sau 1 vợ là lâm an thôi à\nHận Thiên vợ trên danh nghĩa là lâm an, chứ main thì djt khăp thiên hạ\nHận Thiên Địt lung tung hết, chỉ cưới 1,tra nam chỉ tội mấy bé kia,so sánh thì dương khai còn chịu trách nhiệm hơn thằng này\nH vậy là main vô đ!t thiên hạ đúng ko\nChí Thanh Nói đi thì thấy main tệ nma xét lại thì cũng có lí vì vương phi vs quốc sư sấp xỉ 4x rồi đáng tuổi mẹ main rồi lộ ra danh tiếng ko hay ( quốc sư tính cách gọi sơ sơ là ngạo kiều , vương phi thì mặt mỏng ) còn hoàng đế thì tổ chức hôn lễ cũng là danh là thiếp thất vợ nhỏ thì dễ ảnh hưởng lòng dân xẩy ra vấn đề thì dễ hao quốc vận ( như lúc đánh nhau phản quân treo trên đầu main là nc mất thân vong , cái quốc vận rất quan trọng )\nChí Thanh Nhắc main tệ thì nhắc nốt số 7 luôn cho đủ combo :)\nVô Danh Do thằng dương khai biết bao nhiêu, dương khai có chơi có chịu trách nhiệm, không bỏ rơi em nào\nVô Danh Thua thằng dương khai biết bao nhiêu luôn,main người ta chịu trách nhiệm không bỏ rơi đứa nào. Thà không có nhiều gái còn hơn,chơi người ta xong không cho danh phận, chẳng khác gì gái qua đường lầu xanh\nVô Danh Lúc đám cưới mấy ẻm quậy đám cưới nữa mà,tội mấy ẻm vãi\nVô Danh Số 7 là s bác\nChí Thanh trong thiên địa hội, so chất lượng thì ko bằng còn số lượng thì trải rộng cửu châu\nChí Thanh Số 7 nào đây nữa ngoài số 7 thiên địa hội Lý Linh Tố  , vì sợ hỏng thận đành gác tu đạo sang 1 thời gian  chuyển sang tu võ :) lần đầu ra sân bị 2 con bắt , chơi gái xong chạy khéo để thư lại, chạy long nhong tán con khác đi đâu cx gặp ny :) khoảng 2 năm xuống núi hàng trăm mối nợ duyên :)\nChí Thanh T đọc trên mạng thấy có đoạn không có trong truyện là main cùng hồng nhan ngao du thiên hạ\nChí Thanh Khi phỏng vấn tác giả tác giả cũng có nói là lấy bối cảnh từ triều Minh mà thấy thì thời phong kiến TQ thì đặt rất nặng vấn đề danh phận ( góa phụ đi bước nữa , yêu đương hơn tuổi ,  người có danh tiếng lớn làm thiếp ,...) nó khá là nặng nề . Nói đi thì main tệ nma nói lại thì tác giả đang tự tạo nét thắt khó tháo cho truyện á , như trong truyện mấy ông thầy nho giáo đánh nhau vì đặt tên cho tác phẩm của main cho thấy việc lưu danh sử sách , tiếng danh về sau rất là chú trọng . T đọc trên mạng thấy có đoạn là main cùng hồng nhan đi ngao du thiên hạ , và vài người mang thai ko biết có phải cốt truyện tác giả viết thêm người không.\nVô Danh :))) cùng 1 hội với dương thiên huyễn đều ganh ghét main nhưng k bao giờ cho main lọt hố đc\nVô Danh Cho xin chỗ đọc đi bạn",
  "...",
  "....",
  "Xem cảch giới ở đâu z các đạo hữu\nHubfvssg Nghi đại Phụng đả canh nhân cảnh giới tra gg là ra mà",
  "Bro nào biết cách thăng cảnh giới ko chỉ với ạ\nHumie Đọc truyện",
  "cầy lại *1",
  "Chap gặp vương phi là chap nào vậy mn",
  "Còn vài chap nữa là gặp được trấn bắc vương phi đại danh đỉnh đỉnh rồi",
  "Alo có ai cho nhận xét về bộ này ko",
  "Có 370 cách đây 2 ngày trước rùi sao ko cập nhật nhờ. Của người ta dịch xong luôn rùi",
  ".",
  "nhớ lần trước có ng bảo phù hương là yêu tộc nhưng tại sao ở lâu vậy mà ko bị phát hiện nhỉ, có cái vụ thằng đệ tử giám chính đến kĩ viện bắt yêu tộc trà trộn mà sao ko phát hiện dc nhỉ\nNeet thật ra giám chính cái gì cũng biết nhưng ko làm j thoy. Đợi sau này sẽ thấy một chuỗi sự kiện được liên kết lại từ đầu đến cuối không xót cái nào đâu nên cứ chờ thôi ông\nNeet phát hiện từ lúc đưa cánh tay thâng thù r, nhưng mà lại hợp tác thay vì đuổi đi\nQ Giám chính là 1 phần thiên đạo mà như chất xúc tác thôi hiểu vậy cho dễ à",
  "Haiz bị thiên đạo hủy diệt lại phải trùng sinh tu luyện lại emo\nVân Triệt Cùng cảnh ngộ",
  "truyện đầu voi đuôi chuột",
  "Dịch tới 367 rùi, sao mới có 361 trên web thế. tui đang chờ 368 đây.\nZero cho mình xin tên web bạn đọc với ạ\ngà rán Tui coi trên tik tôi ấy",
  "Truyện này đã có tới chap 367 s k cập nhật z",
  'chơi ng ta chán xong "Đồ chung dùng riêng". Nghe cay nghiệt thật, nhưng mà cùng tư tưởng với tôi\nQ Bộ này hay k bác\nThíchđùichânquân với cá nhân tôi thấy thì bộ này hay ông ạ. Tại vì mỗi người tùy vào 1 thời điểm sẽ có 1 gu truyện khác nhau. Nên để tôi review qua cho ông nhé. Tổng quan thế giới rõ ràng, hệ thông tu hành logic, câu cú đầu đủ. Nhân vật nào cx ổn, thậm chí có mấy nv phụ chất lượng lắm. Cốt truyện xoay quanh phá án là chính tấu hề là phụ. Nhược điểm chắc hơi câu chap =)))\nQ Đúng rồi, tôi cay cái đoạn kêu chuộc thân nhưng thằng lìn này né tránh , chê bai ng ta , éo mẹ k đọc nữa luôn\nQ Con đó chỉ là xác chết do bọn yêu thú nó nhập vào thôi, mốt main phập cả yêu thu con nhập vào con ở lầu xanh',
  "Không có gì để chê bộ này cả, lần đầu thấy thể loại trinh thán + manhua mà nó chất lg như này",
  "Truyện hay ko ae\nHuy hay bạn à nhưng ko đọc kĩ thì nổ não đấy\ngà rán bằng tâm ma ko đạo hữu\nluffy ĐZ ko bằng đc đâu bạn",
  "Ịt mẹ mất nick ,cay vcl\nHay toi vừa lấy lại đc\nH Không hiểu sao tự nhiên ko vào đc nick,đọc vật vã mới lên đc lv6 sắp 7 rồi giờ lại như này nghĩ nó chán\nH Tại vừa đổi tên miền nên tự động out raKhông nhớ mật khẩu thì coi như cook\nHay Lvl đầu lên nhanh mà. Từ sau cấp 7 đc 1% đọc mấy trăm chap chưa lên nữa\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nBoy :)) éo hiểu 1 thanh niên nào đó cấp 9,10 đc\nHay Ủa tôi là cấp mấy h thấy mỗi cảnh giới k thấy cấp nữa\nHay tôi đọc ở truyện QQ tròn 4 năm rôi mà mới sắp lv 7. Tất nhiên là tôi có thói quen đi cmt =))))\nHay tôi đọc ở truyện QQ tròn 4 năm rôi mà mới sắp lv 7. Tất nhiên là tôi ko có thói quen đi cmt =))))\nQ 4 năm lv7 :)))\nHay Đọc săp sập cm sạp người ra tôi mới sap lv7 =)))\nBabibooo Ông chỉnh được mà\nQ ông ms lv5 mà:vtên xanh biển ,cảnh giới màu hồng là cấp 5,xanh lá là cấp 6,tên đỏ cảnh giới màu tím ms là 7\nBabibooo ông cấp 7 nhá,và chắc chx lên đc 80k điểm đúng ko,tầm 71~75K điểm thôi\nFu Simp Tôi có gần 59k điểm à cũng chạy đc 60% r",
  "Chương 353 bao nhiêu truyện chữ v ae",
  "bộ admin bận thi học kì r à\nH Ad có vợ có con gái r bro\nRavens tui ghẹo ad tại ra chap lâu thôi mà",
  "trước ra chap đều lắm mà sao giờ gần 2 tuần r chưa ra v\nAnh Ba Chà Cú Bộ này hay k bác\nThíchđùichânquân hay lắm bác đáng đọc",
  "lâu ra v",
  "Tích mãi đc trăm chap lại hết rồi",
  "Thề bộ này đọc manga k hay, đọc lightnovel đi cuốn cực ae ạ\nG ông gọi là manga khéo có mấy thằng vô cắn á\nH Cho nhanh, chung chung thế\nG Ko chung chung đâu broNó có phân ra riêng đấy Giống shounen mà bro gọi là seinen thì chả cắnÀ này là manhua\nUndertaker Gọi là truyện tranh cho nhanh :v đỡ ai cắn\nbủh bủh lmao Vậy đi",
  "Xin ít bộ thể loại main não to thế này với các đạo hữu,",
  "tới act Trấn Bắc Vương đọc hay với cảm xúc vcl\nHumanoid sau arc này là arc Trấn Bắc Vương hả bro\nSimp lỏd đúng rồi",
  "Cuối truyện HTA tu vi gì thế mng ? Nghe bảo là 1 vợ là Lâm An thế thì là chuyện của bao lâu nữa theo thời gian của truyện ?\nTiểu Nhị tu vi võ thần thì phải, 1 vợ lâm an nhưng gái theo nó từ a-z nó chơi hết trừ con thải vi với số 2 thôi :))\nSimp lỏd Bây giờ HTA mới là thất phẩm luyện thần cảnh thì cỡ bnh năm nữa theo tuyến tgian của truyện mới lên được võ thần vậy\nTiểu Nhị Tui cx có biết đâu mới đọc truyện chữ được tí :))) mà nghe nói đại phụng sắp ra live action\nRaiden Ei Tui cx nghe tin là truyện sẽ ra bản phim\nKid Zero đr ấy bro hình như quay xong hết r đang chờ chiếu\nTiểu Nhị chưa đọc tới nhưng tính từ lúc đầu truyện đến 1 năm sau theo tuyến tg của truyện thì nó lên tam phẩm r\nSimp lỏd Chung sư tỷ kiểu :)\nTiểu Nhị 3 năm lên võ thần :) khoảng tầm đấy :)\nVô Danh Chả khác j hack mà nó hack thật được buff khí vạn đại phụng cơ mà\nSimp Cuối game thêm hack thiên đạo công nhận võ thần đâu tiên :)\nVô Danh Lão giám chính công nhận á\nLỏd Simp Uk giám chính là thiên đạo hóa thân mà :)",
  "bây giờ t mới đọc xong hơn nghìn chap truyện chữ, cảm thấy nhiều nhân vật khổ, nhưng mà thương nhất Giám Chính đương đại, có 6 đệ tử, toàn hảo đệ tử :)\nKuro Đến lúc cuối truyện bị bắt cóc xong 5 đứa tranh chức giám chính còn ối dồi hơn nhiều :)",
  "Bộ này hay cày hết truyện chữ r về sau kết hơi nhanh k biết lên truyện tranh có đổi kết ko.\nQ Q Kết nhanh là sao bạn\nĐông Quân Bỏ qua nhiều tình tiết lắm, sau này theo kểu tu luyện nhiều  hơn , k thiên về phá án như trước nữa. HTA lên võ thần r oánh trùm r end truyện nhạt.\nQ Q VT là sự Tồn tại quy tắc quy lực không cho phép được có trong giới bạn quên bộ này nó giới thiệu cho là gì mà đòi phá án hết truyện à\nĐông Quân nói chung bạn cứ theo hết truyện là thấy nó hụt hẫng à, mở bài thân bài hay mà kết chán.\nQ Q Truyện end đến đây cũng gần 1 năm rồi t đọc hết từ tháng 6-7 năm ngoái á",
  "Một trong những truyện hay nhất từng đọc, mặc dù có tu luyện cảnh giới các kiểu nhưng đọc cuốn hơn đại đa số các bộ mì ăn liền hiện giờ, nói chung là kịch liệt đề cử",
  "Có bộ nào hay như bộ này k ae, giới thiệu t với, bộ này cuốn quá\nNakano Light Có bộ tận thế trò chơi ghép hình main dạng thông minh coi khá hayVới bộ đại chu tiên lai bối cảnh vs thế giới cũng giống bộ này ông có thể đọc thử\nNakano Light Ta có một sơn trại nè đạo hữu",
  "Với những ai thích main xài não thì bộ truyện này rất đáng đọc. Main là cảnh sát chuyển sinh sang thế giới tu luyện phong kiến. Thế giới này được xây dựng bố cục chặt chẽ, nhiều bí ẩn cần khám phá... Truyện đi theo lối trinh thám phá án và chính trị nhiều. Đương nhiên vẫn có những pha combat hay. Các nhân vật phụ xây dựng rất tốt, có chiều sâu nội tâm. Cốt truyện khá logic, không có buff xàm ba lắp vớ vẩn. 9,25/10\nSoul về sau thành truyện tu tiên :v",
  "Truyện hay, kết hợp trinh thám và tu luyện 8/10\nSoul Bão chap nên 10/10\nSussy cat top mấy đây",
  "T biết rồi nha, Adm giấu chap câu view",
  "Ad lại ngáo đá gòi",
  "quào, 327 nhảy đến tận 334 cơ à, nhanh đấy",
  "hay phết ae giới thiệu cho tôi mấy kênh đọc audio bộ này được không ?\nJunjin Truyện đọc việt, kênh này lựa giọng Bot không bị chói tai\nQ Vãi có cả audio tiên hiệp à\nTuso Ông lên halazy  audio thì choáng mất:)) ko có gì ngoài tiên hiệp:)",
  "Ae cho hỏi chap 302 thái tử nói Ngụy Uyên là Cô thần nghĩa là gì\nCánh Tất cả quan đều có phe phái riêng ngụy uyên đơn thân chống lại cả triều đình\nCánh cô thần ý nói 1 vị quan có sức ảnh hưởng quá lớn, chiếm ít nhất 3 phần quyền lực trong triều đình, có thể 1 chân đứng ngang hành với hoàng đế trong triều cục và mấy ông như này thường bị khử sớm vì nắm quá nhiều quyền lực gây ảnh hưởng hoàng thất",
  "Ok thế là xong Arc Hứa Đồng La hi sinh , giờ tích chap đợi đến Arc hứa ngân la xé xác thằng súc vật Trấn Bắc Vương là đẹp\nThư Sinh Trấn Bắc Vương nó làm gì v đạo hữu, tiện cho tôi hỏi chap 309 bên truyện tranh tương đương chap bn truyện chữ v\nĐẳng đẳng bủ bủ Trấn bắc vương hình như đi đồ thành để lấy tinh huyết tấn thăng tam phẩm bất diệt chân khu\nĐẳng đẳng bủ bủ Trấn Bắc Vương và lính của nó giết hơn 300 vạn dân trong thành để luyện  tinh huyết đan tấn thăng Nhị Phẩm , arc trấn bắc vương đọc hay ko khác gì arc này đâu .\nThư Sinh chap 310 bên truyện tranh tương đương chap bao nhiêu bên truyện chữ vậy đạo hữu\nĐẳng đẳng bủ bủ Chương 249 nhé ông , mà nếu ông muốn đọc truyện chữ thí tôi khuyên ông nên đọc lại từ đầu , vì lên truyện tranh nó bỏ qua nhiều chi tiết rồi , truyện chữ nó mới đúng là siêu phẩm .\nThư Sinh Nói vậy oan cho trấn bắc vương quá , trấn bắc vưởng qua là 1 trong tam thân  ( nhất khí hóa tam thanh ) của tiên đế thôi ( trong đó có cả hoàng đế hiện tại ) sau main giết tiên đế cảnh giới main tam phẩm còn vì phá lên tiên đế không thể lên nhất phẩm chỉ dừng lại nhị phẩm đạo môn thôi",
  "test",
  "truyen hay k mấy bro?\nletrieu Siu phẩm nhé\nSussy cat Thanks bro",
  "Toàn cao thu tu tiên ko nhìn ra khí của Main nhỉ\nXii li mi Main sau lưng nó có Thiên đạo ai nhìn đc. Nếu nhìn thì cũng tạch sớm",
  "Bão chap liên tục luôn",
  "Woww bão chap",
  "Bão chapp",
  "mong truyện hay cày nhoo",
  "Bộ truyện này là bộ thứ 2 lấy đc nc mắt tôi",
  "Thời gian đầu đọc chục chương bỏ nhưng thấy đến kết mà anh em bảo hay cày vậy\nStead Fast 3 ngày đọc song truyện hay.ai chưa đọc chịu khó đọc thử",
  "truyện hay nên đọc nhé mọi người",
  "Main sau lên làm vua à ae",
  "Hứa Thất An: Chữ Ninh Yến, Địa Thư số 3 toái phiến nắm giữ giả, ngoại hiệu Hứa bạch phiêu (chơi miễn phí), Đại Phụng Đả Canh nhân, hải vương. Hiện đại cảnh sát, rượu cồn trúng độc bỏ mình sau xuyên việt vi Đại Phụng huyện nha khoái thủ. Thực vi Hứa Bình Phong (xem kỹ hạ văn) cùng năm trăm năm trước hoàng thất chi nhánh hậu duệ sở sinh, từ nhỏ bị nhị thúc Hứa Bình Chí cùng thẩm thẩm Lý Như nuôi lớn. Câu lan (coi hát) ba người tổ chi một. Xuyên việt sau tu luyện tư chất tuyệt thế, thân gánh Đại Phụng một nửa khí vận, lại cơ duyên xảo hợp cướp đoạt rồi cổ vương triều di lưu khí vận, nhị phẩm hậu phương năng phân ly khí vận mà bất tử.",
  "Hmmm",
  "Chap 378 này tương đương vs chap bn truyện chữ v mn",
  "3 chap liền :0",
  "vậy là end truyện rồi, truyện hay\nTS Right jz ní\nKhúc Xương Nhỏ chap 274 main chết -> badend\nTS Right có chết đâu",
  ".",
  "các đạo hữu cho xin mấy bộ tựa tựa này với",
  "vl, đọc lại truyện chữ mới thấy cùng vũ trụ với bộ đại chu tiên lại mặc dù 2 tác giả khác nhau, t kiểu: wtf? Tác giả viết đại chu bị phế r mới lập đại phụng, ghi đúng tên main lý mộ của bộ kia luôn, main bộ kia hình như theo đạo môn thì phải\nNo Name ủa thế mạch truyện có liên quan đến nhau k bác, cái nào tiền truyện cái nào hậu truyện\nTechpriest Thời đại chu trước đại phụng, chỉ là cùng thế giới thôi k liên quan gì, mình chỉ bất ngờ là khác tác giả lại cùng viết về 1 thế giới thôi",
  "trên youtobe có tới 300 rồi, ad rảnh lượm về cho ae đọc đê",
  "Nguỵ yên cuối cùng có sống lại không vậy ae\nBạch Lang Có, sau vua chết thì húp bà hoàng hậu\nNo Name vậy à chắc đọc ở đâu rồi ở đây đã thấy đâu\nDạ Ngọc Đọc truyện chữ á bro, chứ manga chắc phải 5 năm nữa mới tới đoạn này\nNo Name manhua chứ",
  "Hello mng truyện hay ko cho xin ý kiến vs\nHuy Tuỳ gu. Truyện này kiểu ko buff quá main dùng não là nhiều",
  "tích đợi up chap 280 mới đọc tiếp mà lâu quá~\nKhúc Xương Nhỏ qua youtube cho lẹ :))\nHumanoid Trên funhub 303 r đấy",
  "Cho tôi hỏi main mấy vợ vậy\nHuỳnh Tuấn Tầm mười mấy người à , mình cũng không nhớ rõ nữa",
  "Cho tôi hỏi main mấy vợ vậy",
  "Cho tôi hỏi main mấy vợ vậy",
  "trên yourube chap 273 hứa thất an chết cmnr\nSussy cat à mà ko sao theo truyện chữ thì 2 3 chap sau hồi sinh ý mà\nSussy cat đang hay thì ngưng để fix chap",
  "truyện chữ hơn 2000 chương vậy là truyện tranh mới đi được 1/10 cốt truyện thôi :(( chắc ít thì cũng phải 5 năm mới end\nQ tích chap tầm 1 năm r quay lại =)))\nQ tên bác giống tên cũ tôi thế, suy nghĩ mãi không hiểu sao tôi lại đọc truyện chữ bộ này lúc nào",
  "dasdsa",
  "Ae cho hỏi Nhất hiệu là trưởng công chúa or quốc sư\nCánh Trưởng công chúa",
  "Ae cho hỏi vợ cả của Main là ai\nCánh Nếu tính theo vai vế thì là Quốc Sư , còn người main cưới đầu tiên thì là Lâm An",
  "Logo của nhóm dịch đặt nơi mất hết chữ , các bác biết trang nào nhóm dịch để logo chỗ khác vs dc k ạ. Minh cảm ơn -_-\nAba Noname lên youtube coi á cho dễ",
  "hay",
  "Ap truyện qq l quản cáo 30s dell cho tắt để xem hết luôn a dm\nKoi Dùng phần mềm chặn qc là dc",
  "Cái ap truyện qq bị cc j vậy quản cáo 5s k nói h toàn gặp quản cáo 2-30s mà dell cho tắt nữa xoá m cho rồi",
  "Ai tóm tắt dùm mình nội dung truyện dc ko ạ?\nThôngThiênGiáo Main kiếp trc làm công an chết xuyên 0 tới dị giới tiếp tục làm công an kể về quá trình phá án kết hợp vs tu tiên huyền huyễn. Theo đánh giá số đông thì truyện hay đầu tư cốt truyện tốt 9/10 đ\nCánh Cám ơn đạo hữu nhiều, đọc thôi :))",
  "Tìm thêm truyện cả main và nvp đều não to như này. Cảm tạ đạo hữu đã ban truyện\nAKS LittleK Có bộ ngụy quân tử không sợ chết cũng na ná như này nhưng là chuyện chữ cơ chứ chuyện tranh nhìn nó hài hài kiểu sảng văn chứ ko đấu chí căng như truyện chữ\nAKS LittleK Ta là đại thần tiên.quay xe như chong chóng\nAKS LittleK Chàng rể mạnh nhất lịch sử\nAKS LittleK Conan :)))",
  "Main đúng là đỉnh cao nhân sinh đi Lầu xanh 0 tốn tiền\nCánh lấy vật đổi vật chứ ko tốn gì, main cho bọn kia sự nổi tiếng, bù lại bọn nó cho main chơi free",
  "Bắc phoi thời nay nhắn tin 1 lúc 4,5 em, bắc phoi thời xưa, gửi thư mệt thấy mẹ\nDuy Ngã Độc TÔN Vấn đề là Phắc Boy thời xưa nó cưới nhiều đứa được =))",
  "Hay",
  "Truyện này ổn không anh em\nBii Phạmm khá ổn,đáng đọc\nFu Simp Rất hay, ta đồng tình với Fu khanh",
  "Truyện hay",
  "Vấn thiên bao giờ ta thành tiên\nCầu Trường Sinh phải kể ra là tu đc bao lâu r chứ?",
  "Sắp đột phá rồi aaaaaaa\nBắc Kì tán nhân Phi thăng chưa Pro\nBắc Kì tán nhân Bro đột phá chx hay đôt quỵ cmnr\nSussy_Cat Phá cảnh rồi",
  "cm",
  "em youtube chap 238 luôn rồi :",
  "Ae cho hỏi 2 đứa viết báo cáo cho cấp trên trong chap 192 là ai với ai v :))",
  "Chap mới nhất ứng với chap bn truyện chữ anh em",
  "Rồi cuối cùng tên của thg main là hứa thất an hay là hứa ninh yến. Khi thì gọi tên này khi thì kêu tên nọ. Khó hiểu vcl\nDương Ngọc Hoàng Ninh yến là tên ở nhà. Thất An là tên đi làm :))\nDương Ngọc Hoàng Đệt ông nói tôi mới để ý nó có 2 tên\nDương Ngọc Hoàng đấy là tên chữ,hiệu tự á bn vd như Nguyễn Du tên tự là Tố Như, hiệu là Thanh Hiên ấy,hán tự có nhiều cách đọc(chắc thế)",
  "Truyện hay mà ra chạm quá",
  "Main có bao nhiêu vợ ae\nBình 1 Vợ nhưng nhiều tình nhân\nĐôngQuân Vậy ai là vợ á bro? Mà làm sao để có đc tên màu đỏ giống bro thế ?\nBình Vợ main là Lâm An công chúaCòn tên màu đỏ là lên lv á\nĐôngQuân Oh ok thank ông",
  "Chúa hề, báo thủ dương thiên huyễn =)), định bán cả ty thiên giám để trang bức",
  "Tao cũng muốn mỗi ngày nhặt được bạc",
  "Ngụy Uyên đọc thấy tội á\nĐôngQuân Sau sống với ny đến già còn gì, tryhard đoạn giữa truyện thôi\nNo Name Sống lại thằng đệ gánh tụt cứt còn mình thì đi vụng trộm",
  'Vãi cả "ĐẠI UY THIÊN LONG"',
  "Chap mới đâu",
  "Truyện chữ main thịt con hoài khánh chap mấy vậy\nTruck -kun Gần cuối, lúc sắp đánh sinh tử vs đám siêu phẩm phật đà, vu thần,vv",
  "2 ngày r chưa có chap ad ơi",
  "Thực ra harem +2 =)), mua 1 tặng 1\nK K Còn ai nx z?\nHhh Cái đứa con gái biến thành tờ giấy đấy",
  "Hứa Thất An sau này có con ko nhỉ?\nNam chưa có, chịt nhiều vđ nhưng mãi ko ai dính\nNam Ko nên có, các truyện mà xây dựng đến lúc main có con là mất hay r, bị kìm chân rất nhiều đi ko dám đi xa quá, ra tay ko cũng còn dứt khoát như trc\nBắc Kì tán nhân Đừng nói vợ con, riêng gia đình nhà chú thôi nó cx ko nỡ rời đi rồi",
  "Đậu moá nó chèn cái tên nhóm dịch có duyên vl, che mất mẹ lời thoại nhân vật luôn, nhóm dịch mắt bị lé hết à",
  "khá",
  "Lú +1",
  "ra một lượt mười mấy chap như hôm bữa thì đọc thả ga nhỉ :)",
  "Bản real nè",
  "Ai đọc qua truyện chữ cho toi biết vợ trấn bắc phi là gái còn trinh phải ko?\nPhạm Vương phi có thân phận đặc biệt, có thể giúp tăng tu vi, phải ăn đúng lúc thì ms có hiệu quả cao nhất đc. Sau cx bổ mỗi th main",
  "Ae lên ytb đọc đi 196 chap rồi",
  "Xếp hạng mỹ nhân trong đây cho aetop 1 mộ nam chi ( trấn bắc vương phi)top 2 nhân tông đạo thủ Lạc ngọc hànhtop 3 nữ vương vạn yêu quốc aka 9 vỹ hồtop 4,5,6 về sau ms đến Hoài khánh, Lâm An, số 2, các đuôi của cửu vỹ,... Các top sau top 3 thì ko chắc do mỗi đứa đẹp 1 kiểu, nhưng 3 top đầu thì sure\nB Vãi bò Nhị hiệu là gái à bro\nKhá Bảnh Đây ừ, phi yến nữ hiệp aka thiên tông thánh nữ đấy =)). Arc này sắp end rồi, arc sau là gặp\nB Thiên tông cấm dục nên chắc không thành vợ đc đâu nhỉ\nKì thị Thiên Tôn Thực ra thiên tông ko hề cấm dục, chỉ là phải vô tình thôi. Mà thiên tông thánh tử, thánh nữ đời này cả 2 đứa đều báo sư môn =))\nK K Báo như nào\nKì thị Thiên Tôn Thì tôn chỉ tông môn là phải vô tình. Thánh tử thì đi chịch dạo khắp nơi, phải hơn trăm đứa con gái nó theo, xong em nào nó cx yêu =)). Thánh nữ thì cx yêu đương, nhưng chủ yếu là nó nghĩa khí quá, ghét ác như thù, hành hiệp trượng nghĩa nên càng ko vô tình đc.",
  "yt tới 196 rồi ae",
  "Nhiều chi tiết chập chờn hé lộ quá, đọc đã vãi",
  "Vl bão to vậy",
  "ối dồi ôi lạp có thêm chap kìa",
  "Xin tên truyện chữ với ae, với cả chap 182 tương ứng với chương bao nhiêu vậy mọi người",
  'hôm nay bão chap đó anh em\nAdmin Admin Ad cx đọc bộ này luôn hả\nAdmin Admin Ông koro ổng spam nhiều lắm, spam lên top 1 luôn, đề nghị ad cho ổng về lại lv6 cho ổng chừa ಠ⁠∀⁠ಠ\ntinh hà spam s z bạn\nAdmin Admin Cho hỏi là sao web mình up chap chậm hơn mấy web khác vậy, vốn chỉ đọc ở web này thôi vì giao diện thân thiện, mà ad leech chậm quá nhiều khi ae cũng bất bình\nNguyễn Gia Long Bộ nào ổng cũng spam câu "hmm"\ntinh hà đọc nhiều lên điểm nhiều chứ spam lên bao nhiêu\nKatsura Lên "chân tiên" rồi mà còn bảo chả lên bao nhiêu\ntinh hà Web nào nhanh vậy ông\nAdmin Admin Lv bao nhiêu lên đc Quả Tạ Vàng vậy ad :))))\nAdmin Admin Đề nghị giáng thiên kiếp xuống koro ạ\ntinh hà comment đâu được tính điểm đâu mà lên lv',
  "Truyện khá hay đó Mọi người biết truyện nào mà main dùng nhiều não hơn là tay chân như này không ?",
  "Hoài Khánh sau này có thành vợ main ko mn?\nPhạm Ko, vợ chỉ có 1, mấy người kia chưa làm lễ cưới nên chưa coi là vợ\nPhạm Có phệt nhé",
  "Cứ mõm là gái auto đổ",
  "xem yt tới chap 18x luôn rồi",
  "Hay",
  "Cho ad biết là Bộ này tui đọc 188 chap r trên app g5 truyện á nhưng đọc sẽ mất phí\nTay Duong Cho xin link nổ cái giá tại hạ k thiếu gì ngoài tiền\nDay by day Tra g5 truyện trên Ch play or app store thoii quy đổi 200đ=2xu=1chap nhiều truyện hơn mấy chục chap\nTay Duong Giật mình tưởng 200k thank kiu ô nha\nDay by day Gke v sao",
  "trên app vs youtube ra đến chap 184 rồi\nNhé ytb kênh nào v bn\nQ bạn vào ghi tên truyện là có",
  "Tóm lại là thằng anh giả làm thằng em, thằng em cầm hàng thằng anh đi lòe thiên hạ, thằng anh bị nhận nhầm là thằng em\nThắng Hại não ghê\nThắng đâu ra ba, thg anh nhờ thg em cầm cái đó đi cầu cứu ông thầy sư\nẢo Thật Đấy Ừ, nhưng về sau cno tưởng th em ms là số 3 =)), th main thì lại được đà giả vờ là th em luôn =))). Đạo trưởng Kim liên thì luôn giữ bí mật thân phận cho ng khác trong nhóm rồi nên cx ko nói",
  "Công an tốt ko ấm dâu",
  "Truyện đell nào cũng có thể loại màu. Khó chịu vc\nShin Xem truyện không màu thì xem bên manga á, truyện Trung với Hàn thì nó toàn thêm màu thôi\nHakai Gin Ý ổng là thể loại này nhưng chắc lỗi typo :)))))\nHakai Gin * thể loại này*",
  "truyện có hay ko mn?\nmình đức hay lam\nmình đức Một câu hỏi vô nghĩa",
  "Chap sau chém luôn thằng lìn này mà",
  "Ai liệt kê các bà vợ của main được không\nKkkk 2 nàng công chúa, trấn bắc vương phi, phù hương, ...\nFallian ơ đụ me chơi nhiều thế.\nKkkk Hình như còn có cả Thải Vy bên bọn giả kim với cả đường muội trong nhà nữa :)))\nTrường Car Đâu ra. Húp đc lâm an, hoài khánh, dạ cơ, vương phi vs quốc sưChưa húp đc thải vy, chung ly vs lý diệu chânCòn em họ ko lq\nK Này em nghe phong phanh thôi bác, tưởng thật :u",
  "Lâm an xuất hiện chap nào z các đạo hữu",
  "Chuộc cai l ồ n",
  "Nhé",
  "Con này sau có thành vk Hứa Thất An không anh em\nKkkk Vợ cưới hỏi đàng hoàng thì có 1 thôi, và có xuất hiện rồi đấy =))\nK Công chúa à\nVcl Nhị công chúa =))Trưởng công chúa công lược khó hơn, nhị công chúa dễ lừa hơn\nK Tưởng phải công lược đc trưởng công chúa trc cơ\nBắc Kì tán nhân Hoài Khánh thông minh hơn, tu vi cao, lạnh lùng, che dấu cảm xúc giỏi. Có đổ cx ko thể hiện j. Lâm An thì ngây thơ quá, nó dụ 1 tí đã đổ rồi còn đâu\nBắc Kì tán nhân Mà mấy đứa khác cx như hoài khánh, yêu rồi mà sống chết ko nhận vì sĩ diện =)). Có lâm an vs phù hương là thể hiện rõ đã đổ đứ đừ\nK Ai vậy bạn",
  "Nhật hiệu giống con gái nhỉ anh em..\nKkkk Tôi nghĩ có khi là bà công túa cơ :-))\nKkkk Trong nhóm 9 ng có 3 gái 6 trai, h thì đoán xem 1,7,8 ai là gái =)). Mà 7,8 mãi sau ms xuất hiện",
  "Chậc, bộ này song tu để tìm cảm giác đột phá cảnh giới nhiều vl nên Ngụy ba ba bị lão hoàng đế NTR cũng bình thường :( chỉ buồn cho Ngụy ba ba sau chết mất tiêu, thế là anh bạn Ninh Yến đột phá\nTrường Car Đâu, song tu đột phá có mỗi quốc sư vs hoa thần là có tác dụng mạnh chứ hoàng hậu của Ngụy baba thì tiến cung bth thôi chứ kp do song tu\nK Cám ơn bác, do em chỉ nghe nói chứ ko đọc novel nên ko rõ",
  "Ông vua thấy đẹp cái là đòi song tuBuồn cái dell ai làm đc j ổng\nHuyễn Ma Nói thế oan cho lão, lão cấm dục 20 năm rồi, kp cứ đẹp là đc đâu\nK H có cấm dục nx ko hay hết r nên chơi xả láng\nHuyễn Ma Ko, ai chứ lão này kp kiểu cứ đẹp là nạp hậu cung đâu. Lão h chỉ muốn trường sinh thôi. Muốn song tu cx chỉ vì trường sinh, đọc đến mấy arc sau ms rõ\nK Ra vậy cũng có chút an tâm",
  "Hm",
  "Cửu PhẩmBát PhẩmThất PhẩmLục PhẩmNgũ PhẩmTứ PhẩmTam PhẩmNhị PhẩmNhất PhẩmSiêu Phẩm\nKoro Sushine Cái trò này số càng cao thì càng yếu phải không\nKoro Sushine đơù, top sv đây à\nIce Phoenix Yep\nKoro Sushine Tiền bối đây có phải là top sv ko?",
  "Đọc gần hết truyện chữ ms hiểu tại sao nhóm dịnh ghi chú ý 2 đứa em gái =))\nK 2 đứa em gái là như nào vậy bạn\nNguyễn Văn Việt Tư chất 2 đứa đấy chỉ thua th main có đại khí vận thôi. Đứa bé hơi đần nhưng mà 7 tuổi bát phẩm cổ sư, đc cổ thần dạy, đứa lớn tu 4 tháng j đấy thất phẩm đạo tông, mà quan trọng là chỉ có nó ms tạm ngăn hậu cung th main ko cháy =)))\nK 4 tháng thất phẩmLại còn ngăn đc hậu cung siêu vãi\nK sau này hậu cung có những ai vậy huynh đệ\nDuCk 2 công chúa, vương phi, quốc sư, dạ cơ ( phù hương) là thịt rồiChưa thịt, mập mờ: thải vy, chung ly ( sư tỷ thải vy), lý diệu chân ( số 2)Nó cx chịt lung tung nhưng qua đường thôi ko tính. T chưa đọc hết, tạm thời là thế\nK Phù hương ko lấy phải ko\nBắc Kì tán nhân Lấy thì đến h t đọc thì mới lấy vợ cả là nhị công chúa thôi. Còn là song tu đạo lữ vs quốc sư, ntr trấn bắc vương =)), nối lại tình xưa vs dạ cơ aka bản thể của phù hương. Thấy bảo sau thịt cả hoài khánh thì t chưa đọc đến\nK Vcl ntr luôn :))\nBắc Kì tán nhân Thì trấn bắc vương chết rồi, đệ nhất mỹ nhân ko húp hơi phí =)), còn trấn bắc vương là th main nó giết =))\nK Chắc trấn Bắc vương chưa sơ múi đc gì đâu đúng ko\nBắc Kì tán nhân Ừ, vương phi thân phận ko phải muốn ăn là ăn đâu",
  "Á à nôn tiền ra:)))",
  "Nhặt bạc thôi cũng giàu :))",
  "dumoa đăng coment ko thấy bao giờ hiện",
  "lại đéo thấy đăng chap nữa rồi. lại ôm chap nữa",
  "Truyện lằng nhằng thế",
  "Đọc hay ko mn:)))\namp main có não và biết cách dùng\namp đọc phải kiên trì đến chap 7 mấy 8 mấy mới vào phần chính",
  "Lâu thế",
  "Toàn mấy ông âm hiểm",
  "Đạo môn mà lại rất tà môn",
  "Đạo môn mà lại rất tà môn",
  "á đù ông này tính từ đầu tới cuối à ghê vl",
  "OK đạo Đức thiên thôn :))",
  "Giờ chơi giải đố à nghề của main",
  "ố ố bão chap cuối năm ae ơi :)))",
  "Mấy ông cứ bảo sao mê phù hương vậy mấy ng khác xinh hơn sao ko mê tại vì phù hương thì đc có mấy đứa khác thì ko",
  "rõ ràng muội muội với công chúa xinh hơn mà nhỉ, con phù hương có gì mà mê ghê thế\nBắc Kì tán nhân Có cái loz( theo đúng nghĩa đen)\nBắc Kì tán nhân muội muội là loạncông chúa ngược đường ( tui nghĩ thế )nên còn phù hương thôi\nBắc Kì tán nhân mà tui nghĩ con ăn lắm ở đầu truyện mới là nữ chính\nHỗn Độn Ma Long Muội muội đâu tính là loạn đâuBố main với chú nó là anh enh kết nghĩa thôiHồi xưa với bây giờ anh em kiểu đấy lấy nhau như thường\nBắc Kì tán nhân Kịch bản nó là vậy ko thay đổi được đâu.\nBắc Kì tán nhân Có cái j mày vô hỏi nó đi\nBắc Kì tán nhân phò cx là người ae sao căng vậy=))\nBạch Tuộc Ờ nhể nhưng đa số luật giờ là nhận con nuôi thì cho dù djt nhau với người thuộc gia đình nhận nuôi dell cùng huyết thống thì vẫn là loạn\nBạch Tuộc ủa ra là kết nghĩa hả vậy mà trc h tôi tưởng nó loạn thiệt\nvcl lúc main đòi lấy nó thì tôi mới căng sau còn giờ tôi chỉ đang bảo thấy thằng main phản ứng thái quá với sắc đẹp tầm thg đó thôi",
  "mỗi hệ thống tu luyện đều có điểm mạnh riêng, thực sự chỉ tu mỗi võ hơi tiếc\nBắc Kì tán nhân Mấy cái kia main quá tuổi nhập môn r\nBắc Kì tán nhân mấy cái kia có điểm mạnh thì cx có điểm yếu còn võ tu thì đồng đều\nvcl đâu võ tu ko có thuật truy vết với phát hiện nói dối của tư thiên giám",
  "viết chữ xấu vl",
  "Giờ mới bắt đầu truyện trc đấy là mở bài à",
  "Giờ mới hiểu ý nghiawx của tên truyện\nTôn giả Gần chap 80 mới biết đả cảnh nhân là gì :)))\nVô Quần Đúng đúng\nVô Quần giống cẩm y vệ đấy",
  "Anh em sang web chính đọc để có chap mới : Tintruyen3s đến 124 chap, đủ view có chap",
  "Cái bảng tuần hoàn mình nhìn muốn đâu đầu chóng mặt thằng kia nó coi như bảo bối :)))\nBắc Kì tán nhân lần đầu thấy mà",
  "Tiếp đê",
  ".",
  ":))",
  ":)\nHoho ❤",
  "mông có đau ko haha",
  "Hảo",
  "vẫn chỉ ham danh vọng mà thôi",
  "Con này ngoài cái vú to ra có gì đâu, chẳng xinh bằng muội muội main",
  "Đuma cười sặc",
  "K có mục báo spam nhể",
  "Đến thanh lâu suốt ngày mà bảo ko tới chốn phong n.guyệt :v",
  "ô hôm nào cx có chap luôn :))))",
  "Nơi cho con quan vào làm đĩ, hay nhỉ giá mà có thật t đi suốt ngày :)))",
  "Lên luyện tinh cảnh đi đã rồi mơ :)))",
  "hay ko\nArthur Shelby Ko hay đâu, tui đánh giá là 5* thôi :)\nSouf Nope Graii eh\nArthur Shelby j bro\nNope Graii ko",
  "Bà dì trừ cái hơi kiệt ra còn lại khá tốt vẫn ngon, nhà này phải nói là ai cũng nuột :))\nBắc Kì tán nhân Cu quan điểm",
  "Quẩy học viện công chuẩn bị qua quẩy tư thiên giám hả",
  "Ad bên web chính nó bảo ngày up 5 chục chap cũng đc vấn đề là cày đủ view hay ko thôi\nBắc Kì tán nhân ô có link raw Trung ko cho tui xin đi :)))), chứ chờ ae cày lâu lắm\nSIêu Nhân gao https://www.colamanhua.com/22363/\nBắc Kì tán nhân có quả app nào dịch tiếng trung ok để đọc ko đạo hữu\nVĩnh Dạ Gg dịch ông ơi=))\nVĩnh Dạ GG dịchThuật pháp sơ cấp mà đến luyện khí cũng nắm giữ được đấy huynh đệ :D\nHòm và mai táng dịch thì đc nhưng ko chuẩn bài lắm\nVĩnh Dạ Hiểu sơ sơ là được rồi huynh đệTrông chờ éo gì ở thuật pháp sơ cấp :D\nHòm và mai táng Tại hạ thống lĩnh vạn quân nhưng pháp khí này tại hạ không dùng đc\nHòm và mai táng kiểu nó chán ko đc cuốn\nCheems Thích Bạn Thế là đạo hạnh không vững rồiHủy đạo hạnh tu lại đi là vừa :D\nVĩnh Dạ Thì chịu thôiKhông thì đi học tiếng trung đêNgộ tính cao thì tầm 2 tháng là nhập môn rồiCòn kiểu nước đổ đầu vịt, nghe tai này lọt tai kia như tôi thì 3 tháng rồi vẫn chả hiểu con mọe gì :D",
  "đang hay, bao h main chơi viết cả quyển đạo đức kinh nhỉ, chắc lên làm thánh luôn\nBắc Kì tán nhân Qua web chính cày view đi r có chap mới",
  "Ơ công chúa chống đc",
  "Co ai độc lang khoa kỳ duyên koCũng có chapter nói về 2 người này\nXpeke zoji ông nhắc t mới nhớ có khúc nói về chuyện tình của 2 người này",
  'Sao giờ thấy cái nho đạo này bá thế nhỉ :)))\nTất chân gợi cảm Bá thì bá thật nhưng thọ kém hơn lũ tu võ với tiên\nTất chân gợi cảm Sức mạnh ngôn từ bao giờ cũng bá =)) nhưng k tu thân thể nên tuổi thọ không bằng\nAkatsuki Kaga Cái này mà du nhập đc về VN đc thì voãi lozz luôn éo đùa\nKokoro Thế mấy ông ý nói mấy câu kiểu "ta trường sinh bất lão" thì sao\nVô Quần Thì thân tử đạo tiêu :-)) tốn hết sức luôn\nVô Quần nho đạo dùng sức mạnh dựa vào trí, nên là trí không đủ để thực hiện thì đi đời =)))',
  ":)",
  "Thằng này đem đạo đức kinh ra đọc chắc bọn kia đái ra quần mất",
  "Ghj",
  "Chấm",
  "Đợi mòn đít",

  "Chương 47 truyện tranh là chương mấy của truyện chữ vậy mọi ng?",
  "chuyện ra lâu thếchờ mong lắm rồi",
  "Tôn nghiêm là cái thá gì rất có tiền đồ",
  "Tôn nghiêm là thứ không thể giúp mình no bụng nha em gái  nên đùi gà quý hơn tôn nghiêm",
  "Kể ra bà thím main cũng xinh nhỉ :)))\nTất chân gợi cảm Ây bro đừng làm vậy :))",
  "Dell hiểu sao bộ nào t hay hay lại hầu hết ra lâu vcl\nApple Mini vì nó hay nên nó mới ra lâu\nApple Mini Để khéo người đợi ấy mà\nCat Cube  uk",
  "Duma hay mà ra lâu vcl",
  "Sao 2 tháng mới ra 1 chap vậy",
  "đợi mãi",
  "hóng",
  "Hóng",
  "Ae cho tui xin review bộ này với mà bộ này main có harem hay húp bé nào chưa v?\nAsura Emily Main có harem và t nhớ là húp 4 đứa\nAsura Emily Main có harem và húp đc 4 đứa\nAsura Emily Main có harem và húp 4 đứa\nAsura Emily Main có harem và húp 4 đứa\nAsura Emily Main có harem và húp 4 đứa",
  "Lấy lộn là cười",
  "7/10",
  "Nhìn mấy ổng bay màu tao cũng hiểu được vấn đề rồi",
  "một bộ hậu cung hay\nLuV Hậu cung à",
  "hóngggggggg",
  "hay",
  "hay",
  "bộ này lên truyện tranh nhanh thế:vvvv",
];

comments = comments
  .map(handleCommentText)
  .filter((c) => c)
  .map(cleanSensitiveWords);

async function analyzeCommentChunk(chunk) {
  // Xây dựng prompt với chunk comment
  const prompt = `
  Phân tích các bình luận sau về một bộ truyện tranh.
Bỏ qua bình luận vấn đề tốc độ, lỗi, quảng cáo,tốc độ ra chap, tập mới và chất lượng của website.  
Trả kết quả dưới dạng JSON với cấu trúc:

{
  "positive": <số lượng bình luận tích cực>,
  "negative": <số lượng bình luận tiêu cực>,
  "neutral": <số lượng bình luận trung lập>,
  "spam": <số lượng bình luận spam hoặc không liên quan>,
  "summary": "<tóm tắt ý kiến chung về truyện>"
  "negativeComments": các bình luận tiêu cực
}

  Chỉ trả về chuỗi JSON, không kèm lời giải thích.

  Bình luận:
  ${chunk.map((c, i) => `${i + 1}. ${c}`).join("\n")}
  `;

  // Gọi API của Ollama (giả sử bạn dùng olamajs)
  const res = await callAI({ prompt });
  console.log(res);
  let result;
  try {
    result = JSON.parse(extractJsonString(res));
  } catch (e) {
    console.error("Lỗi khi parse JSON:", res);
    result = null;
  }

  return result;
}
async function scoreCommentChunk(chunk) {
  // Xây dựng prompt với chunk comment
  const prompt = `
  Phân tích các bình luận sau về một bộ truyện tranh. Bỏ qua bình luận vấn đề tốc độ, lỗi, quảng cáo,tốc độ ra chap, tập mới và chất lượng của website.
  đánh giá từng bình luận 
  Trả kết quả dưới dạng JSON với cấu trúc:

  {
  score: tiêu cực từ -5 đến -1, tích cực 2 đến 5 và trung tính và không liên quan là 1, nội dung spam, vô nghĩa là 0,
  spam: true | false,
  content: nội dung của comment
  }

  Chỉ trả về chuỗi JSON, không kèm lời giải thích.

  Bình luận:
  ${chunk.map((c, i) => `${i + 1}. ${c}`).join("\n")}
  `;

  // Gọi API của Ollama (giả sử bạn dùng olamajs)
  const res = await callAI({ prompt });
  console.log(res);
  let result;
  try {
    result = JSON.parse(extractJsonString(res));
  } catch (e) {
    console.error("Lỗi khi parse JSON:", res);
    result = null;
  }

  return result;
}

async function analyzeAllComments(comments) {
  const chunkSize = 30; // Số comment mỗi chunk
  const commentChunks = chunkArray(comments, chunkSize);
  const allResults = [];

  for (let i = 0; i < commentChunks.length; i++) {
    console.log(`Đang phân tích chunk ${i + 1}/${commentChunks.length}...`);
    const result = await analyzeCommentChunk(commentChunks[i]);
    if (result) {
      allResults.push(result);
    }
    // Bạn có thể thêm delay nếu cần tránh quá tải model
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return allResults;
}

function aggregateResults(resultsArray) {
  // Giả sử các trường là số, bạn chỉ cần cộng dồn
  return resultsArray.reduce((acc, curr) => {
    return {
      positive: (acc.positive || 0) + (curr.positive || 0),
      negative: (acc.negative || 0) + (curr.negative || 0),
      neutral: (acc.neutral || 0) + (curr.neutral || 0),
      spam: (acc.spam || 0) + (curr.spam || 0),
      // activeLevel, summary bạn có thể tổng hợp theo cách riêng (ví dụ, chọn mức "sôi động" nếu có bất kỳ chunk nào đạt mức này)
      // activeLevels: [...(acc.activeLevels || []), curr.activeLevel],
      summaries: [...(acc.summaries || []), curr.summary],
    };
  }, {});
}

async function finalAna(chunk) {
  let prompt = `
  Bạn nhận được danh sách các kết quả phân tích từ từng chunk của bình luận, mỗi kết quả có định dạng JSON như sau:

{
  "positive": <số bình luận tích cực của chunk>,
  "negative": <số bình luận tiêu cực của chunk>,
  "neutral": <số bình luận trung lập của chunk>,
  "spam": <số bình luận spam của chunk>,
  "activeLevel": "<mức độ sôi động của chunk: 'im lặng', 'bình thường', hoặc 'sôi động'>",
  "summary": "<tóm tắt ý kiến của chunk>"
}

Hãy tổng hợp tất cả các kết quả trên thành một kết quả tổng hợp cuối cùng, theo các yêu cầu sau:

0. **score**: đưa ra đánh giá mức độ nên đọc trên thang điểm 0 -> 100
1. **positive, negative, neutral, spam**: Tính tổng số của các trường này từ tất cả các chunk.
2. **activeLevel**: 
   - Nếu có ít nhất một chunk có "activeLevel" là "sôi động", thì kết quả tổng hợp là "sôi động".
   - Nếu không có "sôi động" nhưng có ít nhất một chunk có "bình thường", thì kết quả là "bình thường".
   - Nếu tất cả đều là "im lặng", thì kết quả là "im lặng".
3. **summary**: Tổng hợp các nội dung tóm tắt của từng chunk thành một nhận định chung ngắn gọn, chỉ giữ lại thông tin chính.


Hãy trả về kết quả cuối cùng dưới dạng một chuỗi JSON (JSON string) với định dạng:

{
  "positive": <tổng số bình luận tích cực>,
  "negative": <tổng số bình luận tiêu cực>,
  "neutral": <tổng số bình luận trung lập>,
  "spam": <tổng số bình luận spam không liên quan>,
  "activeLevel": "<mức độ sôi động tổng hợp>",
  "summary": "<nhận định chung về truyện tranh>"
}

Chỉ trả về chuỗi JSON, không kèm lời giải thích.

Dưới đây là danh sách các kết quả chunk (ví dụ):

${chunk.map((c, i) => `${i + 1}. ${c}`).join("\n")}

Hãy tổng hợp kết quả trên theo định dạng đã nêu.
`;
  const res = await callAI({
    prompt,
  });

  console.log(res);
}
// Sử dụng:
analyzeAllComments(comments).then((allResults) => {
  console.log(comments.length);

  const aggregated = aggregateResults(allResults);
  console.log("Kết quả tổng hợp:", aggregated);

  finalAna(allResults);
});
